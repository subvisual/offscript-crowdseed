import { FC } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { useMint } from "../lib/MintContext";

import SectionActionsView from "../views/SectionActionsView";

const SectionActionsController: FC = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { onMintClick, mintTx } = useMint();

  if (!account || mintTx) {
    return <></>;
  }

  return (
    <SectionActionsView>
      <sock-mint onClick={onMintClick} />
      <sock-buy href="#ticket-buy" />
    </SectionActionsView>
  );
};

export default SectionActionsController;
