import { network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

interface Config {
  proxyRegistry: string;
}

const configs: Record<number, Config> = {
  // mainnet
  1: {
    proxyRegistry: "0xa5409ec958c83c3f309868babaca7c86dcb077c1",
  },
  // rinkeby
  4: {
    proxyRegistry: "0xf57b2c51ded3a29e6891aba85459d600256cf317",
  },
};

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const config = configs[network.config.chainId!];

  const nft = await get("OffscriptNFT");

  await deploy("OpenSeaFactory", {
    from: deployer,
    args: [
      "https://ipfs.io/ipfs/QmSQpjJSKnjR9X23WaGp1gKo7ReteUMNri16Vru43pGGHC/default.png",
      nft.address,
      config.proxyRegistry,
    ],
    log: true,
  });
};

func.id = "deploy_factory";
func.tags = ["factory"];
func.dependencies = ["nft"];
func.skip = async () => {
  console.log(network.config.chainId);

  return !configs[network.config.chainId!];
};

export default func;
