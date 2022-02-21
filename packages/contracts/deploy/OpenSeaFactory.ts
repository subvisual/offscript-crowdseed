import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const nft = await get("OffscriptNFT");

  await deploy("OpenSeaFactory", {
    from: deployer,
    args: [
      // TODO replace with a template image
      "https://ipfs.io/ipfs/QmTVpMGYEfkLrdpmthA1oWpcpMVqnpWYBuTvQ6stTjXojF/1.png",
      nft.address,
    ],
    log: true,
  });
};

func.id = "deploy_factory";
func.tags = ["factory"];
func.dependencies = ["nft"];

export default func;
