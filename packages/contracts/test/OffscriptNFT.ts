import { ethers } from "hardhat";
import { expect } from "chai";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { OffscriptNFT } from "../typechain-types";
import { BigNumber } from "ethers";

const { parseUnits } = ethers.utils;

describe("OffscriptNFT", () => {
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let nft: OffscriptNFT;
  const price = parseUnits("0.03");

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
      price
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

    it("sets the correct price", async () => {
      expect(await nft.price()).to.equal(price);
    });
  });

  describe("mintPublic", () => {
    it("can mint 40 NFTs", async () => {
      const supply = await nft.totalPublicSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.mintPublic({ value: price });
      }

      expect(await nft.remainingPublicSupply()).to.equal(0);
      // the 46th must fail
      await expect(nft.mintPublic({ value: price })).to.be.revertedWith(
        "Depleted"
      );
    });

    it("each NFT gets a name", async () => {
      await nft.mintPublic({ value: price });
      await nft.mintPublic({ value: price });

      const metadata1 = await nft.getMetadata(1);
      const metadata2 = await nft.getMetadata(2);
      expect(metadata1.name).to.equal("Alder");
      expect(metadata2.name).to.equal("Black alder");
    });

    it("after all public mints, all availablePerTrait values are 0", async () => {
      const supply = await nft.totalPublicSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.mintPublic({ value: price });
      }

      expect(await nft.availablePerTrait(0)).to.equal(0);
      expect(await nft.availablePerTrait(1)).to.equal(0);
      expect(await nft.availablePerTrait(2)).to.equal(0);
      expect(await nft.availablePerTrait(3)).to.equal(0);
    });

    it("after all public mints, remaining public supply is 0", async () => {
      const supply = await nft.totalPublicSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.mintPublic({ value: price });
      }

      expect(await nft.remainingPublicSupply()).to.equal(0);
    });

    it("fails if value is lower than price", async () => {
      const tx = nft.mintPublic({ value: price.sub(1) });

      await expect(tx).to.be.revertedWith("Not enough");
    });
  });

  describe("mintPrivate", () => {
    it("mints with the correct IDs", async () => {
      await nft.mintPrivate(
        [alice.address, bob.address],
        [10, 20],
        ["Foo", "Bar"]
      );

      expect(await nft.ownerOf(41)).to.eq(alice.address);
      expect(await nft.ownerOf(42)).to.eq(bob.address);

      const metadata41 = await nft.getMetadata(41);
      const metadata42 = await nft.getMetadata(42);
      expect(metadata41.discount).to.eq(10);
      expect(metadata42.discount).to.eq(20);
      expect(metadata41.name).to.eq("Foo");
      expect(metadata42.name).to.eq("Bar");
    });

    it("can mint many NFTs", async () => {
      const supply = await nft.totalPrivateSupply();
      for (let i = 0; i < supply; ++i) {
        await nft.mintPrivate([alice.address], [10], ["Foo"]);
      }

      expect(await nft.remainingPrivateSupply()).to.equal(0);
    });

    it("can only be called by the owner", async () => {
      const action = nft
        .connect(alice)
        .mintPrivate([alice.address], [10], ["Foo"]);

      await expect(action).to.be.reverted;
    });
  });

  describe("check URI functions", () => {
    it("checks if URI is correct", async () => {
      nft.mintPublic({ value: price });

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
      await nft.mintPublic({ value: price });

      const uri = await nft.tokenURI(1);
    });
  });

  describe("sweep", () => {
    it("sends all ether to the owner", async () => {
      await nft.connect(alice).mintPublic({ value: price });
      await nft.connect(alice).mintPublic({ value: price });
      await nft.connect(alice).mintPublic({ value: price });

      const action = () => nft.sweep();

      await expect(action).to.changeEtherBalances(
        [owner, nft],
        [parseUnits("0.09"), parseUnits("-0.09")]
      );
    });

    it("is not callable by a non-owner", async () => {
      await nft.connect(alice).mintPublic({ value: price });

      const action = nft.connect(alice).sweep();

      await expect(action).to.be.reverted;
    });
  });
});