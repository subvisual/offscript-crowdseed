import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { read, execute } = hre.deployments;

  const owner = await read("OffscriptPayment", "owner");

  if (owner == deployer) {
    await execute(
      "OffscriptPayment",
      { from: deployer, log: true },
      "transferOwnership",
      "0x2a84EeE5eCa5c5DD031E53bE179E429f49E87d39"
    );
  }
};

func.id = "transfer_payment_ownership";
func.tags = ["payment"];
func.dependencies = ["deploy_payment"];

export default func;
