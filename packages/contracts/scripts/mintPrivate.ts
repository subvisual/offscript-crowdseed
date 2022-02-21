import { ethers, network } from "hardhat";
import { OffscriptNFT } from "../typechain-types";

import { promises as fs } from "fs";

async function main() {
  const [signer] = await ethers.getSigners();

  const nft = (await ethers.getContractAt(
    "OffscriptNFT",
    "0x7f035182a1213e7b48089e61A7724067AA9BcF19",
    signer
  )) as OffscriptNFT;

  const factory = (await ethers.getContractAt(
    "OpenSeaFactory",
    "0x87A4864aCCF6fe6614A3430D96DC3c321c21A77A",
    signer
  )) as OffscriptNFT;

  console.log(await factory.tokenURI(0));
  // await nft.mintPrivate([signer.address], [50]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
