import type { FC } from "react";
import type { Web3Provider } from "@ethersproject/providers";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { useWeb3React } from "@web3-react/core";

import { useNFT } from "./NFTContext";

interface Asset {
  tokenId: number;
  discount: number;
  name: string;
  image: string;
}

interface MintContext {
  onMintClick: () => void;
  mintTx?: any;
  mined: boolean;
  assets: Asset[];
  bestAsset?: Asset;
}

const MintContext = createContext<MintContext>({
  mined: false,
  assets: [],
  onMintClick: () => {
    /* do nothing */
  },
});

export const MintProvider: FC = ({ children }) => {
  const { library, account } = useWeb3React<Web3Provider>();
  const [mintTx, setMintTx] = useState<any>();
  const [mined, setMined] = useState(false);
  const { contract, signer } = useNFT();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [bestAsset, setBestAsset] = useState<Asset | undefined>();

  const onMintClick = useCallback(() => {
    (async function () {
      if (!contract || !signer) return;

      const price = await contract.price();
      try {
        const tx = await contract
          .connect(signer)
          .mintPublic({ value: price, gasLimit: 150000 });
        console.log(tx.hash);

        setMintTx(tx);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [contract, signer]);

  useEffect(() => {
    (async function () {
      if (!mintTx) {
        return;
      }

      try {
        console.log("waiting");
        await mintTx.wait();
        console.log("waited");

        setMined(true);
      } finally {
        setMined(false);
      }
    })();
  }, [mintTx]);

  // set assets
  useEffect(() => {
    (async function () {
      if (!library || !contract || !account) {
        return;
      }
      const filter = contract.filters.Transfer(null, account);

      const events = await contract.queryFilter(filter);

      const result = [];
      for (const event of events) {
        const tokenId = event.args!.tokenId.toNumber();
        const owner = await contract.ownerOf(tokenId);

        const uri = await contract.tokenURI(tokenId);

        const buffer = Buffer.from(uri.split(",")[1], "base64");
        const metadata = JSON.parse(buffer.toString());

        if (owner == account) {
          result.push({
            tokenId,
            name: metadata.name,
            discount: metadata.attributes.discount,
            image: metadata.image,
          });
        }
      }

      setAssets(result);
    })();
  }, [library, contract, account, mined]);

  // set bestAsset
  useEffect(() => {
    let asset: Asset | undefined;

    assets.forEach((current) => {
      if (!asset || current.discount > asset.discount) {
        asset = current;
      }
    });

    setBestAsset(asset);
  }, [assets]);

  return (
    <MintContext.Provider
      value={{ onMintClick, mintTx, mined, assets, bestAsset }}
    >
      {children}
    </MintContext.Provider>
  );
};

export const useMint = (): MintContext => useContext(MintContext);
