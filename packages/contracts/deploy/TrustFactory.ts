import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { getOrNull, read, execute } = hre.deployments;

  const factory = await getOrNull("OpenSeaFactory");

  if (!factory) {
    return;
  }

  const owner = await read("OffscriptNFT", { from: deployer }, "owner");

  if (owner == factory.address) {
    return;
  }

  await execute(
    "OffscriptNFT",
    { from: deployer, log: true },
    "transferOwnership",
    factory.address
  );
};

func.id = "execute_factory_trust";
func.tags = ["trust"];
func.dependencies = ["nft", "factory"];

export default func;
