import { ethers, network } from "hardhat";
import { OffscriptNFT } from "../typechain-types";

import { promises as fs } from "fs";

async function main() {
  const [signer] = await ethers.getSigners();

  const nft = (await ethers.getContractAt(
    "OffscriptNFT",
    "0xfcEFb36cAe2A979269810116434FF24589Ba16ef",
    signer
  )) as OffscriptNFT;

  const factory = (await ethers.getContractAt(
    "OpenSeaFactory",
    "0x3c617d25dc82c67a6156691e3ea5f80043e9b1dc",
    signer
  )) as OffscriptNFT;

  console.log(await factory.tokenURI(0));
  await nft.mintPrivate([signer.address], [50]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
