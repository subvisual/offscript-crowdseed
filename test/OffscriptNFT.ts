import { ethers } from "hardhat";
import { expect } from "chai";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { OffscriptNFT } from "../typechain-types";

const { parseUnits } = ethers.utils;

describe("OffscriptNFT", () => {
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let nft: OffscriptNFT;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    let OffscriptNFT = await ethers.getContractFactory("OffscriptNFT");

    nft = (await OffscriptNFT.deploy(
      "http://localhost/",
      45,
      105,
      [10, 20, 30, 40, 50],
      [10, 15, 15, 4, 1]
    )) as OffscriptNFT;
  });

  describe("constructor", () => {
    it("sets the correct name", async () => {
      expect(await nft.name()).to.equal("OffscriptNFT");
    });

    it("sets the correct symbol", async () => {
      expect(await nft.symbol()).to.equal("OFFSCRIPT");
    });

    it("sets the correct public supply", async () => {
      expect(await nft.publicSupply()).to.equal(45);
    });

    it("sets the correct internal supply", async () => {
      expect(await nft.internalSupply()).to.equal(105);
    });

    it("sets the correct discounts supply", async () => {
      expect(await nft.discounts(0)).to.equal(10);
      expect(await nft.discounts(1)).to.equal(20);
      expect(await nft.discounts(2)).to.equal(30);
      expect(await nft.discounts(3)).to.equal(40);
      expect(await nft.discounts(4)).to.equal(50);

      expect(await nft.availablePerTrait(0)).to.equal(10);
      expect(await nft.availablePerTrait(1)).to.equal(15);
      expect(await nft.availablePerTrait(2)).to.equal(15);
      expect(await nft.availablePerTrait(3)).to.equal(4);
      expect(await nft.availablePerTrait(4)).to.equal(1);
    });
  });

  describe("mintPublic", () => {
    it("can mint 45 NFTs", async () => {
      for (let i = 0; i < 45; ++i) {
        await nft.connect(alice).mintPublic();
      }

      // the 46th must fail
      await expect(nft.connect(alice).mintPublic()).to.be.revertedWith(
        "Depleted"
      );
    });

    it("after the 45 mints, all availablePerTrait values are 0", async () => {
      for (let i = 0; i < 45; ++i) {
        await nft.connect(alice).mintPublic();
      }

      expect(await nft.availablePerTrait(0)).to.equal(0);
      expect(await nft.availablePerTrait(1)).to.equal(0);
      expect(await nft.availablePerTrait(2)).to.equal(0);
      expect(await nft.availablePerTrait(3)).to.equal(0);
      expect(await nft.availablePerTrait(4)).to.equal(0);
    });
  });

  describe("mintInternal", () => {
    it("can mint 105 NFTs", async () => {
      for (let i = 0; i < 105; ++i) {
        await nft.connect(owner).mintInternal([alice.address], [10]);
      }

      // the 106th must fail
      await expect(
        nft.connect(owner).mintInternal([alice.address], [10])
      ).to.be.revertedWith("Depleted");
    });

    it("can only be called by the owner", async () => {
      const action = nft.connect(alice).mintInternal([alice.address], [10]);

      await expect(action).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });
});
