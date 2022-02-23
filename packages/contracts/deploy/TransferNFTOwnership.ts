import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { read, execute } = hre.deployments;

  const owner = await read("OffscriptNFT", "owner");

  if (owner == deployer) {
    await execute(
      "OffscriptNFT",
      { from: deployer, log: true },
      "transferOwnership",
      "0x2a84EeE5eCa5c5DD031E53bE179E429f49E87d39"
    );
  }
};

func.id = "transfer_nft_ownership";
func.tags = ["nft"];
func.dependencies = ["deploy_nft"];

export default func;
