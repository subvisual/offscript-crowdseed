import { DeployFunction } from "hardhat-deploy/types";

interface Config {
  uri: string;
}

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Factory", {
    from: deployer,
    args: [
      //...
    ],
    log: true,
  });
};

func.id = "deploy_factory";
func.tags = ["Factory"];
func.dependencies = ["OffscriptNFT"];

export default func;
