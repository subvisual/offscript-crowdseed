import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

const { parseUnits } = ethers.utils;

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("OffscriptNFT", {
    from: deployer,
    args: [
      "OffscriptNFT",
      "OFFSCRIPT",
      "https://infura-ipfs.io/ipfs/QmSQpjJSKnjR9X23WaGp1gKo7ReteUMNri16Vru43pGGHC/",
      40,
      110,
      [10, 25, 40, 100],
      [23, 10, 5, 2],
      parseUnits("0.03"),
    ],
    log: true,
  });
};

func.id = "deploy_nft";
func.tags = ["nft"];

export default func;
