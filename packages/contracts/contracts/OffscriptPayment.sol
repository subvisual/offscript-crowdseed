// SPDX-License-Identifier: UNLICENSED
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
        _nft = nft;
        dai = _dai;
        usdt = _usdt;
        usdc = _usdc;

        oracles[address(0x0)] = oracleEth;
        oracles[address(_dai)] = oracleDai;
        oracles[address(_usdt)] = oracleUsdt;
        oracles[address(_usdc)] = oracleUsdc;

        basePrice = _basePrice;
    }

    function checkForNft(address owner) public returns (uint256, uint256) {
        return (0, 0);
        // uint256 num = _nft.balanceOf(owner);
        // uint256 discount = 0;
        // uint256 tokenId = 0;
        // for (uint256 i = 0; i < num; i++) {
        //     uint256 aux = _nft.tokenOfOwnerByIndex(owner, i);
        //     uint256 aux2 = _nft.traits(aux);
        //     if(aux2 > discount){
        //         discount = aux2;
        //         tokenId = aux;
        //     }
        // }

        // return (discount,tokenId);
    }

    function payWithEth() external payable {
        AggregatorV3Interface oracle = AggregatorV3Interface(
            oracles[address(0x0)]
        );

        uint256 decimals = 18;
        uint256 oracleDecimals = oracle.decimals();

        (uint256 discount, uint256 nftId) = checkForNft(msg.sender);

        // call oracle & compute price
        (
            uint256 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint256 answeredInRound
        ) = oracle.latestRoundData();

        //Falta aplicar o desconto
        discount = discount * 10**(decimals - 2);

        // ((target*1e8) / oracle_price) * (currency_decimal - oracle_decimals)
        uint256 amount = ((basePrice * 10**oracleDecimals) / uint256(price)) *
            10**(decimals - oracleDecimals);

        uint256 discountInValue = amount * discount;

        emit Payment(msg.sender, amount - discountInValue, nftId, address(0));
    }

    function payWithERC20(address _token) external {
        require(_token != address(0x0));
        AggregatorV3Interface oracle = AggregatorV3Interface(oracles[_token]);

        require(address(oracle) != address(0x0), "token not supported");

        uint256 decimals = IERC20Metadata(_token).decimals();
        uint256 oracleDecimals = oracle.decimals();

        (uint256 discount, uint256 nftId) = checkForNft(msg.sender);

        // call oracle & compute price
        (
            uint256 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint256 answeredInRound
        ) = oracle.latestRoundData();

        discount = discount * 10**(decimals - 2);

        // ((target*1e8) / oracle_price) * (currency_decimal - oracle_decimals)
        uint256 amount = ((basePrice * 10**oracleDecimals) *
            10**(decimals - oracleDecimals)) / uint256(price);

        // TODO stack too deep error
        // uint256 discountInValue = amount * discount;

        // IERC20(_token).safeTransferFrom(msg.sender, address(this), amount-discountInValue);

        // emit Payment(msg.sender, amount-discountInValue, nftId, _token);
    }

    //Caso erro - abortar revert ou require

    function withdraw() external onlyOwner {
        dai.safeTransfer(msg.sender, dai.balanceOf(address(this)));
        usdt.safeTransfer(msg.sender, usdt.balanceOf(address(this)));
        usdc.safeTransfer(msg.sender, usdc.balanceOf(address(this)));
        payable(msg.sender).transfer(address(this).balance);
    }
}
