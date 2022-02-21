import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { get, read, execute } = hre.deployments;

  const factory = await get("OpenSeaFactory");

  const isTrusted = await read(
    "OffscriptNFT",
    { from: deployer },
    "isTrusted",
    factory.address
  );

  if (!isTrusted) {
    await execute(
      "OffscriptNFT",
      { from: deployer, log: true },
      "setIsTrusted",
      factory.address,
      true
    );
  }
};

func.id = "execute_factory_trust";
func.tags = ["trust"];
func.dependencies = ["nft", "factory"];

export default func;
