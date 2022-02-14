import { ethers } from "hardhat";
import { expect } from "chai";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { OffscriptPayment } from "@root/typechain";

import * as ForkHelpers from "./forkHelpers";

const { parseUnits } = ethers.utils;

describe("OffscriptPayment", () => {
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let payment: OffscriptPayment;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    let OffscriptPayment = await ethers.getContractFactory("OffscriptPayment");

    payment = await OffscriptPayment.deploy();
  });

  beforeEach(async () => {
    await ForkHelpers.forkToMainnet(14203855);
  });

  it("test with oracles working here", async () => {
    // TODO
  });
});
