import { DeployFunction } from "hardhat-deploy/types";

interface Config {
  uri: string;
}

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("OffscriptNFT", {
    from: deployer,
    args: [
      "https://nft.offscript.com/assets/",
      40,
      110,
      [10, 25, 40, 100],
      [23, 10, 5, 2],
    ],
    log: true,
  });
};

func.id = "deploy_nft";
func.tags = ["OffscriptNFT"];

export default func;
