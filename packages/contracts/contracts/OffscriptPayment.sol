// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import {IOffscriptNFT} from "./IOffscriptNFT.sol";

import "hardhat/console.sol";

contract OffscriptPayment is Ownable {
    //
    // Libraries
    //
    using SafeERC20 for IERC20;

    //
    // Events
    //
    //Save some info?
    event Payment(
        address payer,
        uint256 amount,
        uint256 nftId,
        address tokenId
    );

    //
    // State
    //
    IERC20 public dai;
    IERC20 public usdt;
    IERC20 public usdc;

    // NFT contract
    IOffscriptNFT public nft;

    // base ticket price, in USD
    uint256 public basePrice;

    mapping(address => AggregatorV3Interface) public oracles;

    constructor(
        IERC20 _dai,
        IERC20 _usdt,
        IERC20 _usdc,
        AggregatorV3Interface oracleEth,
        AggregatorV3Interface oracleDai,
        AggregatorV3Interface oracleUsdt,
        AggregatorV3Interface oracleUsdc,
        IOffscriptNFT _nft,
        uint256 _basePrice
    ) Ownable() {
        // TODO address(0) checks
        nft = _nft;
        dai = _dai;
        usdt = _usdt;
        usdc = _usdc;

        oracles[address(0x0)] = oracleEth;
        oracles[address(_dai)] = oracleDai;
        oracles[address(_usdt)] = oracleUsdt;
        oracles[address(_usdc)] = oracleUsdc;

        basePrice = _basePrice;
    }

    function checkForNft(uint256 tokenId) internal view returns (uint256) {
        (uint8 discount, ) = nft.getMetadata(tokenId);
        return discount;
    }

    function payWithEth(uint256 tokenId) external payable {
        uint256 decimals = 18;

        if (tokenId > 0) {
            require(nft.ownerOf(tokenId) == msg.sender, "is not the owner");
        }
        uint256 discount = checkForNft(tokenId);

        discount = discount * 10**(decimals - 2);

        uint256 amount = getPriceEth();

        uint256 discountInValue = amount * discount;

        emit Payment(msg.sender, amount - discountInValue, tokenId, address(0));
    }

    function payWithERC20(address _token, uint256 tokenId) external {
        require(_token != address(0x0));
        AggregatorV3Interface oracle = AggregatorV3Interface(oracles[_token]);

        require(address(oracle) != address(0x0), "token not supported");

        uint256 decimals = IERC20Metadata(_token).decimals();

        if (tokenId > 0) {
            require(nft.ownerOf(tokenId) == msg.sender, "is not the owner");
        }
        uint256 discount = checkForNft(tokenId);

        discount = discount * 10**(decimals - 2);

        // ((target*1e8) / oracle_price) * (currency_decimal - oracle_decimals)
        uint256 amount = getPriceERC20(_token);

        uint256 discountInValue = amount * discount;

        IERC20(_token).transferFrom(
            msg.sender,
            address(this),
            amount - discountInValue
        );

        emit Payment(msg.sender, amount - discountInValue, tokenId, _token);
    }

    //Caso erro - abortar revert ou require

    function withdraw() external onlyOwner {
        dai.safeTransfer(msg.sender, dai.balanceOf(address(this)));
        usdt.safeTransfer(msg.sender, usdt.balanceOf(address(this)));
        usdc.safeTransfer(msg.sender, usdc.balanceOf(address(this)));
        payable(msg.sender).transfer(address(this).balance);
    }

    function getPriceEth() public view returns (uint256) {
        AggregatorV3Interface oracle = AggregatorV3Interface(
            oracles[address(0x0)]
        );

        (, int256 price, , , ) = oracle.latestRoundData();

        return
            (((basePrice * 10**(oracle.decimals() * 2)) / uint256(price)) *
                10**18) / 10**oracle.decimals();
    }

    function getPriceERC20(address token) public view returns (uint256) {
        AggregatorV3Interface oracle = AggregatorV3Interface(oracles[token]);

        uint256 decimals = IERC20Metadata(token).decimals();

        (, int256 price, , , ) = oracle.latestRoundData();

        return
            (((basePrice * 10**(oracle.decimals() * 2)) / uint256(price)) *
                10**decimals) / 10**oracle.decimals();
    }
}
