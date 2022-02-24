import type { Web3Provider } from "@ethersproject/providers";
import type { Contract, Signer } from "ethers";
import type { FC } from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import { useWeb3React } from "@web3-react/core";

interface INFTContext {
  contract?: Contract;
  signer?: Signer;
  chainId?: number;
}

import abi from "./abis.json";

const Addresses: Record<number, string> = {
  1: "0xe943A95D7aEB81aa7431d49e2Df048989C10FB70",
  31337: "0x546C74767d6d24ab4449334Ba74888e1218178D8",
};

const NFTContext = createContext<INFTContext>({ chainId: 0 });

export const NFTProvider: FC = ({ children }) => {
  const { chainId, library, account } = useWeb3React<Web3Provider>();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [signer, setSigner] = useState<Signer | undefined>(undefined);

  useEffect(() => {
    if (!library || !account) return;

    setSigner(library.getSigner(0));
  }, [library]);

  // set contract
  useEffect(() => {
    if (!library || !chainId) return;

    const contract = new ethers.Contract(Addresses[chainId], abi, library);
    setContract(contract);
  }, [signer, chainId, library]);

  return (
    <NFTContext.Provider
      value={{
        contract,
        chainId,
        signer,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

export const useNFT = (): INFTContext => useContext(NFTContext);
