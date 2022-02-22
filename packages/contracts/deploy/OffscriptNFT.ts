import { network, ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

// interface Config {
//   proxyRegistry: string;
// }

// const configs: Record<number, Config> = {
//   // mainnet
//   1: {
//     proxyRegistry: "0xa5409ec958c83c3f309868babaca7c86dcb077c1",
//   },
//   // rinkeby
//   4: {
//     proxyRegistry: "0xf57b2c51ded3a29e6891aba85459d600256cf317",
//   },
// };

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // const config = configs[network.config.chainId!];

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
      ethers.utils.parseUnits("0.03"),
    ],
    log: true,
  });
};

func.id = "deploy_nft";
func.tags = ["nft"];

export default func;
