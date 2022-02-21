import { network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

interface Config {
  dai: string;
  usdt: string;
  usdc: string;
  oracleEth: string;
  oracleDai: string;
  oracleUsdt: string;
  oracleUsdc: string;
}

const configs: Record<number, Config> = {
  // mainnet
  1: {
    dai: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    oracleDai: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
    oracleEth: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    oracleUsdt: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
    oracleUsdc: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
  },
};

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const config = configs[network.config.chainId!];

  const nft = await get("OffscriptNFT");

  await deploy("OffscriptPayment", {
    from: deployer,
    args: [
      config.dai,
      config.usdt,
      config.usdc,
      config.oracleEth,
      config.oracleDai,
      config.oracleUsdt,
      config.oracleUsdc,
      nft.address,
      200,
    ],
    log: true,
  });
};

func.id = "deploy_payment";
func.tags = ["payment"];
func.dependencies = ["nft"];
func.skip = async () => !configs[network.config.chainId!];

export default func;
