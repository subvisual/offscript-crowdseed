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
      "name",
      "symbol",
      "https://our-url.com/nfts/",
      40,
      110,
      [10, 25, 40, 100],
      [23, 10, 5, 2],
      ethers.constants.AddressZero
    )) as OffscriptNFT;
  });

  describe("constructor", () => {
    it("sets the correct name", async () => {
      expect(await nft.name()).to.equal("name");
    });

    it("sets the correct symbol", async () => {
      expect(await nft.symbol()).to.equal("symbol");
    });

    it("sets the correct public supply", async () => {
      expect(await nft.totalPublicSupply()).to.equal(40);
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
      const supply = await nft.totalPublicSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.mintPublic(alice.address);
      }

      expect(await nft.remainingPublicSupply()).to.equal(0);
      // the 46th must fail
      await expect(nft.mintPublic(alice.address)).to.be.revertedWith(
        "Depleted"
      );
    });

    it("after all public mints, all availablePerTrait values are 0", async () => {
      const supply = await nft.totalPublicSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.mintPublic(alice.address);
      }

      expect(await nft.availablePerTrait(0)).to.equal(0);
      expect(await nft.availablePerTrait(1)).to.equal(0);
      expect(await nft.availablePerTrait(2)).to.equal(0);
      expect(await nft.availablePerTrait(3)).to.equal(0);
    });

    it("after all public mints, remaining public supply is 0", async () => {
      const supply = await nft.totalPublicSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.mintPublic(alice.address);
      }

      expect(await nft.remainingPublicSupply()).to.equal(0);
    });
  });

  describe("mintPrivate", () => {
    it("mints with the correct IDs", async () => {
      await nft.mintPrivate([alice.address, bob.address], [10, 20]);

      expect(await nft.ownerOf(41)).to.eq(alice.address);
      expect(await nft.ownerOf(42)).to.eq(bob.address);
      expect(await nft.traits(41)).to.eq(10);
      expect(await nft.traits(42)).to.eq(20);
    });

    it("can mint many NFTs", async () => {
      const supply = await nft.totalPrivateSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.mintPrivate([alice.address], [10]);
      }

      expect(await nft.remainingPrivateSupply()).to.equal(0);
    });

    it("can only be called by the owner", async () => {
      const action = nft.connect(alice).mintPrivate([alice.address], [10]);

      await expect(action).to.be.reverted;
    });
  });

  describe("check URI functions", () => {
    it("checks if URI is correct", async () => {
      nft.mintPublic(alice.address);

      const uri = await nft.tokenURI(1);

      expect(uri.startsWith("data:application/json;base64,")).to.be.true;

      var buffer = Buffer.from(uri.split(",")[1], "base64");
      const metadata = JSON.parse(buffer.toString());

      expect(metadata.attributes.discount).to.be.a("number");
      expect(metadata.image).to.be.eq("https://our-url.com/nfts/1.png");
    });

    it("does not allow anyone but the owner to change the baseURI", async () => {
      const action = nft.connect(alice).setBaseURI("someURL");

      await expect(action).to.be.reverted;
    });
  });

  describe("tokenURI", () => {
    it("gets the metadata for a given token", async () => {
      nft.mintPublic(alice.address);

      const uri = await nft.tokenURI(1);
    });
  });
});
