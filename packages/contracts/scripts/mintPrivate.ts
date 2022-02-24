import { ethers, network } from "hardhat";
import { OffscriptNFT, OpenSeaFactory } from "../typechain-types";

import { promises as fs } from "fs";

async function main() {
  const [signer] = await ethers.getSigners();

  const nft = (await ethers.getContractAt(
    "OffscriptNFT",
    "0xAab215a181B7a43F4aEA29A5e7fD02cbe67234e1",
    signer
  )) as OffscriptNFT;

  await nft.mintPrivate([signer.address], [50]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
