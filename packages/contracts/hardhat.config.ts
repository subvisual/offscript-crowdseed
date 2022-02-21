import { task } from "hardhat/config";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-gas-reporter";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const { DEV_MNEMONIC, TESTNET_MNEMONIC, INFURA_ETH_ID } = process.env;

let networks: Record<string, any> = {
  hardhat: {
    accounts: {
      mnemonic: DEV_MNEMONIC,
    },
  },
};

if (!process.env.CI) {
  networks["rinkeby"] = {
    url: `https://rinkeby.infura.io/v3/${INFURA_ETH_ID}`,
    accounts: {
      mnemonic: TESTNET_MNEMONIC,
    },
  };
}

const config = {
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 300,
      },
    },
  },
  networks,
  namedAccounts: {
    deployer: 0,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    gasPrice: 100,
    currency: "USD",
  },
  mocha: {
    timeout: 2000000,
  },
};

export default config;
