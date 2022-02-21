import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { getOrNull, read, execute } = hre.deployments;

  const factory = await getOrNull("OpenSeaFactory");

  if (!factory) {
    return;
  }

  const isTrusted = await read(
    "OffscriptNFT",
    { from: deployer },
    "isTrusted",
    factory.address
  );

  if (isTrusted) {
    return;
  }

  await execute(
    "OffscriptNFT",
    { from: deployer, log: true },
    "setIsTrusted",
    factory.address,
    true
  );
};

func.id = "execute_factory_trust";
func.tags = ["trust"];
func.dependencies = ["nft", "factory"];

export default func;
