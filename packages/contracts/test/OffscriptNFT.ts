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
      [10, 25, 40, 100],
      [23, 10, 5, 2]
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
  });

  describe("mintPrivate", () => {
    it("can mint many NFTs", async () => {
      const supply = 200;
      for (let i = 0; i < supply; ++i) {
        await nft.mintPrivate([alice.address], [10]);
      }
    });

    it("can only be called by the owner", async () => {
      const action = nft.connect(alice).mintPrivate([alice.address], [10]);

      await expect(action).to.be.reverted;
    });

    describe("check URI functions", () => {
      it("checks if URI is correct", async () => {
        nft.mintPublic(alice.address);

        const uri = await nft.tokenURI(1);

        expect(uri).to.equal("https://our-url.com/nfts/1");
      });

      it("does not allow anyone but the owner to change the baseURI", async () => {
        const action = nft.connect(alice).setBaseURI("someURL");

        await expect(action).to.be.reverted;
      });
    });

    describe("setTokenURI", () => {
      it("allows changing the URI", async () => {
        await nft.mintPublic(alice.address);

        expect(await nft.tokenURI(1)).to.equal("https://our-url.com/nfts/1");

        await nft.setTokenURI(1, "not-1");

        expect(await nft.tokenURI(1)).to.equal(
          "https://our-url.com/nfts/not-1"
        );

        await nft.setBaseURI("");

        expect(await nft.tokenURI(1)).to.equal("not-1");
      });

      it("is not callable by a non-owner", async () => {
        await nft.mintPublic(alice.address);

        expect(nft.connect(alice).setTokenURI(1, "")).to.be.reverted;
      });
    });
  });
});
