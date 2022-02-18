import { ethers } from "hardhat";
import { expect } from "chai";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { OffscriptNFT } from "../typechain-types";
import { assert } from "console";

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
      "https://our-url.com/nfts/",
      40,
      110,
      [10, 25, 40, 100],
      [23, 10, 5, 2]
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
      expect(await nft.publicSupply()).to.equal(40);
    });

    it("sets the correct internal supply", async () => {
      expect(await nft.internalSupply()).to.equal(110);
    });

    it("sets the correct discounts supply", async () => {
      expect(await nft.discounts(0)).to.equal(10);
      expect(await nft.discounts(1)).to.equal(25);
      expect(await nft.discounts(2)).to.equal(40);
      expect(await nft.discounts(3)).to.equal(100);

      expect(await nft.availablePerTrait(0)).to.equal(23);
      expect(await nft.availablePerTrait(1)).to.equal(10);
      expect(await nft.availablePerTrait(2)).to.equal(5);
      expect(await nft.availablePerTrait(3)).to.equal(2);
    });
  });

  describe("mintPublic", () => {
    it("can mint 45 NFTs", async () => {
      const supply = await nft.publicSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.connect(owner).mintPublic(alice.address);
      }

      // the 46th must fail
      await expect(
        nft.connect(owner).mintPublic(alice.address)
      ).to.be.revertedWith("Depleted");
    });

    it("after all public mints, all availablePerTrait values are 0", async () => {
      const supply = await nft.publicSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.connect(owner).mintPublic(alice.address);
      }

      expect(await nft.availablePerTrait(0)).to.equal(0);
      expect(await nft.availablePerTrait(1)).to.equal(0);
      expect(await nft.availablePerTrait(2)).to.equal(0);
      expect(await nft.availablePerTrait(3)).to.equal(0);
    });
  });

  describe("mintInternal", () => {
    it("can mint 110 NFTs", async () => {
      const supply = await nft.internalSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.connect(owner).mintInternal([alice.address], [10]);
      }

      // the 106th must fail
      await expect(
        nft.connect(owner).mintInternal([alice.address], [10])
      ).to.be.revertedWith("Depleted");
    });

    it("can only be called by the owner", async () => {
      const action = nft.connect(alice).mintInternal([alice.address], [10]);

      await expect(action).to.be.reverted;
    });

    describe("check URI functions", () => {
      it("checks if URI is correct", async () => {
        nft.connect(owner).mintPublic(alice.address);

        const uri = await nft.tokenURI(1);

        expect(uri).to.equal("https://our-url.com/nfts/1");
      });

      it("does not allow anyone but the owner to change the baseURI", async () => {
        const action = nft.connect(alice).setBaseURI("someURL");

        await expect(action).to.be.reverted;
      });
    });
  });
});
