import { ethers } from "hardhat";
import { expect } from "chai";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { OffscriptPayment, ERC20, OffscriptNFT } from "../typechain-types";
import { ERC20__factory } from "../typechain-types";

import * as ForkHelpers from "./forkHelpers";

const { parseUnits } = ethers.utils;

describe("OffscriptPayment", () => {
  const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let payment: OffscriptPayment;
  let usdc: ERC20;
  let dai: ERC20;
  let usdt: ERC20;

  let nft: OffscriptNFT;

  const config = {
    // mainnet
    dai: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    oracleDai: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
    oracleEth: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    oracleUsdt: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
    oracleUsdc: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
  };

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    let OffscriptNFT = await ethers.getContractFactory("OffscriptNFT");
    let OffscriptPayment = await ethers.getContractFactory("OffscriptPayment");
    nft = (await OffscriptNFT.deploy(
      "name",
      "symbol",
      "https://our-url.com/nfts/",
      40,
      [10, 25, 40, 100],
      [23, 10, 5, 2]
    )) as OffscriptNFT;

    payment = (await OffscriptPayment.deploy(
      config.dai,
      config.usdt,
      config.usdc,
      config.oracleEth,
      config.oracleDai,
      config.oracleUsdt,
      config.oracleUsdc,
      nft.address,
      200
    )) as OffscriptPayment;

    usdc = new ERC20__factory(owner).attach(config.usdc);
    usdt = new ERC20__factory(owner).attach(config.usdt);
    dai = new ERC20__factory(owner).attach(config.dai);
  });

  beforeEach(async () => {
    await ForkHelpers.forkToMainnet(14203855);
  });

  describe("constructor", () => {
    it("sets all the right values", async () => {
      expect(await payment.dai()).to.equal(config.dai);
      expect(await payment.usdt()).to.equal(config.usdt);
      expect(await payment.usdc()).to.equal(config.usdc);
      expect(await payment.oracles(config.dai)).to.equal(config.oracleDai);
      expect(await payment.oracles(config.usdt)).to.equal(config.oracleUsdt);
      expect(await payment.oracles(config.usdc)).to.equal(config.oracleUsdc);
      expect(await payment.oracles(ethers.constants.AddressZero)).to.equal(
        config.oracleEth
      );
      expect(await payment.basePrice()).to.equal(200);
      expect(await payment.nft()).to.equal(nft.address);
    });
  });

  // it("USDC payment", async () => {
  //   ForkHelpers.mintToken(usdc, alice, parseUnits("1000", 6));
  //   await usdc.connect(alice).approve(payment.address, parseUnits("1000", 6));

  //   await payment.connect(alice).payWithERC20(usdc.address);

  //   const balance = await usdc.balanceOf(payment.address);

  //   // TODO
  //   expect(balance).to.be.closeTo(parseUnits("100", 6), 10000);
  // });

  // it("token eth", async () => {
  //   const price = ethers.BigNumber.from("0"); // TODO await payment.getPriceEth();
  //   const balanceBefore = await alice.getBalance();
  //   await payment.connect(alice).payWithEth({ value: price.mul(110).div(100) });
  //   // TODO
  //   const balanceAfter = await alice.getBalance();

  //   expect(balanceAfter).to.be.closeTo(balanceBefore.sub(price), 0.0011);
  // });

  // it("emits an event", async () => {
  //   const price = ethers.BigNumber.from("0"); // TODO await payment.getPriceEth();
  //   const tx = payment
  //     .connect(alice)
  //     .payWithEth({ value: price.mul(110).div(100) });

  //   // await expect(tx).to.emit('PaidWithEth').withArgs(alice.address, ....)
  // });
});
