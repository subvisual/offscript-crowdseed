import { ethers, network } from "hardhat";
import { OffscriptNFT } from "../typechain-types";

import { promises as fs } from "fs";

async function main() {
  const [signer] = await ethers.getSigners();

  const nft = (await ethers.getContractAt(
    "OffscriptNFT",
    "0xa45c8d291EB21b8E2aCefC4Ea17A8aEDAa3aD5B8",
    signer
  )) as OffscriptNFT;

  const factory = (await ethers.getContractAt(
    "OpenSeaFactory",
    "0xe0F3AB213C636236a631F9FC0BD9353A4207860e",
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
