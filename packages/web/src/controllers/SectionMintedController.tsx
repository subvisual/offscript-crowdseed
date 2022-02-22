import { FC } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import SectionMintedView from "../views/SectionMintedView";

import { useMint } from "../lib/MintContext";

const SectionMintedController: FC = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { mintTx, mined } = useMint();

  if (!mintTx) {
    return <></>;
  }

  return (
    <SectionMintedView>
      <sock-hash target="_blank" href={`http://etherscan.io/tx/${mintTx.hash}`}>
        <div className="af-class-text--20">View on Etherscan</div>
      </sock-hash>
    </SectionMintedView>
  );
};

export default SectionMintedController;
