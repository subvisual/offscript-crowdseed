import { ethers } from "hardhat";
import { expect } from "chai";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { OffscriptPayment, ERC20 } from "../typechain-types";
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

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    let OffscriptPayment = await ethers.getContractFactory("OffscriptPayment");

    let ERC20 = await ethers.getContractFactory("ERC20");

    payment = await OffscriptPayment.deploy(); // TODO
    usdc = new ERC20__factory(owner).attach(USDC_ADDRESS);
  });

  beforeEach(async () => {
    await ForkHelpers.forkToMainnet(14203855);
  });

  it("token test", async () => {
    ForkHelpers.mintToken(usdc, alice, parseUnits("1000", 6));
    await usdc.connect(alice).approve(payment.address, parseUnits("1000", 6));

    await payment.connect(alice).payWithERC20(usdc.address);
    // TODO
  });

  it("token eth", async () => {
    const price = await payment.getPriceEth();
    const balanceBefore = ..
    await payment.connect(alice).payWithEth({ value: price.mul(110).div(100) });
    // TODO
    const balanceAfter = ..

      expect(balanceAfter).to.be.closeTo(balanceBefore.sub(price), 0.0011)
  });
});