import { network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  if (network.live) {
    return;
  }

  await deploy("FakeDAI", { from: deployer, log: true });
  await deploy("FakeUSDC", { from: deployer, log: true });
  await deploy("FakeUSDT", { from: deployer, log: true });
  await deploy("FakeOracleUSD", { from: deployer, log: true });
  await deploy("FakeOracleETH", { from: deployer, log: true });
};

func.id = "test_setup";
func.tags = ["test_setup"];

export default func;
