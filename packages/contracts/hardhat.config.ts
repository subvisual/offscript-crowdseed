import { task } from "hardhat/config";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const { DEV_MNEMONIC } = process.env;

const config = {
  solidity: "0.8.11",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: DEV_MNEMONIC,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
};

export default config;
