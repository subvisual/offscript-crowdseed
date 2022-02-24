import { FC } from "react";
import { useEffect, useCallback, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";

import { useMint } from "./lib/MintContext";
import { useNFT } from "./lib/NFTContext";

const injected = new InjectedConnector({
  supportedChainIds: [1, 31337],
});
const network = new NetworkConnector({
  urls: {
    1: process.env.REACT_APP_MAINNET_ENDPOINT!,
    31337: "http://127.0.0.1:8545",
  },
  defaultChainId: process.env.NODE_ENV === "production" ? 1 : 31337,
});

interface ConnectProps {
  onConnectBtn: any;
}

const Connect: FC<ConnectProps> = ({ onConnectBtn }) => {
  return <button onClick={onConnectBtn}>Connect</button>;
};

const ConnectSuccess: FC = () => {
  return <p>connected</p>;
};

interface Asset {
  tokenId: number;
  discount: number;
  image: string;
}

const Check: FC = () => {
  const { library, account } = useWeb3React<Web3Provider>();
  const { contract } = useNFT();
  const [asset, setAsset] = useState<Asset | undefined>();
  const [assets, setAssets] = useState<Asset[]>([]);

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
            discount: metadata.attributes.discount,
            image: metadata.image,
          });
        }
      }

      setAssets(result);
    })();
  }, [library, contract, account]);

  useEffect(() => {
    let asset: Asset | undefined;

    assets.forEach((current) => {
      if (!asset || current.discount > asset.discount) {
        asset = current;
      }
    });

    setAsset(asset);
  }, [assets]);

  return (
    <div>
      You have {assets.length} Offscript NFT(s).
      {asset && asset.discount > 0
        ? `The rarest one is eligible for a ${asset.discount}% discount`
        : ""}
    </div>
  );
};

const Mint: FC = () => {
  const { onMintClick, mintTx } = useMint();

  return (
    <div>
      <button onClick={onMintClick}>Mint</button>
    </div>
  );
};

export const TestView: FC = () => {
  const { activate, account } = useWeb3React<Web3Provider>();
  const { contract } = useNFT();

  const onConnectBTN = useCallback(
    (e: any) => {
      e.preventDefault();
      activate(injected);
    },
    [injected, activate]
  );

  // connect to network provider
  useEffect(() => {
    activate(network);
  }, []);

  return (
    <div>
      {account ? <ConnectSuccess /> : <Connect onConnectBtn={onConnectBTN} />}
      <Check />
      <Mint />
    </div>
  );
};
