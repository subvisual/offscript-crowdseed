import { ethers } from "hardhat";
import { expect } from "chai";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type {
  OffscriptPayment,
  IERC20,
  OffscriptNFT,
  IERC20Metadata,
} from "../typechain-types";
import { IERC20__factory } from "../typechain-types";

import * as ForkHelpers from "./forkHelpers";

const { parseUnits } = ethers.utils;
const { MaxUint256 } = ethers.constants;

describe("OffscriptPayment", () => {
  const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let payment: OffscriptPayment;
  let usdc: IERC20;
  let dai: IERC20;
  let usdt: IERC20;

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
    await ForkHelpers.forkToMainnet(14203855);
  });

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    let OffscriptNFT = await ethers.getContractFactory("OffscriptNFT");
    let OffscriptPayment = await ethers.getContractFactory("OffscriptPayment");
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

    payment = (await OffscriptPayment.deploy(
      config.dai,
      config.usdt,
      config.usdc,
      config.oracleEth,
      config.oracleDai,
      config.oracleUsdt,
      config.oracleUsdc,
      nft.address,
      800,
      950,
      50
    )) as OffscriptPayment;

    usdc = IERC20__factory.connect(config.usdc, owner);
    usdt = IERC20__factory.connect(config.usdt, owner);
    dai = IERC20__factory.connect(config.dai, owner);

    await ForkHelpers.mintToken(usdc, alice, parseUnits("1000000", 6));
    await ForkHelpers.mintToken(usdt, alice, parseUnits("1000000", 6));
    await ForkHelpers.mintToken(dai, alice, parseUnits("1000000", 18));

    await usdc.connect(alice).approve(payment.address, MaxUint256);
    await dai.connect(alice).approve(payment.address, MaxUint256);
    await usdt.connect(alice).approve(payment.address, MaxUint256);
  });

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
    expect(await payment.basePrice()).to.equal(800);
    expect(await payment.extendedPrice()).to.equal(950);
    expect(await payment.nft()).to.equal(nft.address);
    expect(await payment.supply()).to.equal(50);
  });

  ["regular", "extended"].forEach((ticketType) => {
    [0, 10, 20, 50, 100].forEach((discount) => {
      it(`ETH payment, ${ticketType} ticket, ${
        discount ? `with ${discount}%` : "without"
      } discount`, async () => {
        let nftId = 0;
        // mint NFT
        if (discount) {
          await nft.mintPrivate([alice.address], [discount], ["foo"]);
          nftId = 41;
        }

        let expectedPrice =
          ticketType == "regular" ? parseUnits("0.28") : parseUnits("0.33");

        if (discount) {
          expectedPrice = expectedPrice.sub(
            expectedPrice.mul(discount).div(100)
          );
        }

        const extended = ticketType == "regular" ? false : true;

        await payment
          .connect(alice)
          .payWithEth(nftId, extended, { value: parseUnits("1") });

        const balance = await ethers.provider.getBalance(payment.address);

        expect(balance).to.be.closeTo(
          expectedPrice,
          parseUnits("0.01") as unknown as number
        );
      });

      ["DAI", "USDT", "USDC"].forEach((currency) => {
        it(`${currency} payment, ${ticketType} ticket, ${
          discount ? `with ${discount}%` : "without"
        } discount`, async () => {
          const contracts: Record<string, [IERC20, number]> = {
            DAI: [dai, 18],
            USDT: [usdt, 6],
            USDC: [usdc, 6],
          };

          let nftId = 0;
          if (discount) {
            await nft.mintPrivate([alice.address], [discount], ["foo"]);
            nftId = 41;
          }

          let expectedPrice =
            ticketType == "regular"
              ? await payment.basePrice()
              : await payment.extendedPrice();

          if (discount) {
            expectedPrice = expectedPrice - (expectedPrice * discount) / 100;
          }

          const extended = ticketType == "regular" ? false : true;
          const [token, decimals] = contracts[currency];

          await payment
            .connect(alice)
            .payWithERC20(token.address, nftId, extended);

          const balance = await token.balanceOf(payment.address);

          expect(balance).to.be.closeTo(
            parseUnits(expectedPrice.toString(), decimals),
            parseUnits("2", decimals) as unknown as number
          );
        });
      });
    });
  });

  describe("withdraw", () => {
    it("sends all funds to the owner", async () => {
      await payment
        .connect(alice)
        .payWithEth(0, false, { value: parseUnits("1") });
      await payment.connect(alice).payWithERC20(dai.address, 0, false);
      await payment.connect(alice).payWithERC20(usdt.address, 0, false);
      await payment.connect(alice).payWithERC20(usdc.address, 0, false);

      const ethBefore = await owner.getBalance();
      await payment.connect(owner).sweep();
      const ethAfter = await owner.getBalance();

      expect(await dai.balanceOf(owner.address)).to.be.closeTo(
        parseUnits("800"),
        parseUnits("2") as unknown as number
      );
      expect(await usdt.balanceOf(owner.address)).to.be.closeTo(
        parseUnits("800", 6),
        parseUnits("2", 6) as unknown as number
      );
      expect(await usdc.balanceOf(owner.address)).to.be.closeTo(
        parseUnits("800", 6),
        parseUnits("2", 6) as unknown as number
      );
      expect(ethAfter).to.be.closeTo(
        ethBefore.add(parseUnits("0.28")),
        parseUnits("0.01") as unknown as number
      );
    });

    it("cannot be called by a non-owner", async () => {
      const action = payment.connect(alice).sweep();

      await expect(action).to.be.reverted;
    });
  });

  describe("setSupply", () => {
    it("Confirm change", async () => {
      await payment.connect(owner).setSupply(100);

      expect(await payment.supply()).to.equal(100);
    });

    it("cannot be called by a non-owner", async () => {
      const action = payment.connect(alice).setSupply(0);

      await expect(action).to.be.reverted;
    });

    it("Cannot buy without supply", async () => {
      const supply = (await payment.supply()) as unknown as number;
      for (let i = 0; i < supply; ++i) {
        await payment
          .connect(alice)
          .payWithEth(0, false, { value: parseUnits("1") });
      }

      expect(await payment.remainingSupply()).to.equal(0);
      // the 51th must fail
      await expect(
        payment.connect(alice).payWithEth(0, false, { value: parseUnits("1") })
      ).to.be.revertedWith("no tickets available");
    });
  });
});
