// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "hardhat/console.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

contract offscriptPayment is Ownable {
    IERC20 public _dai;
    IERC20 public _usdt;
    IERC20 public _usdc;

    address _nftContract;

    AggregatorV3Interface priceFeedEth;
    AggregatorV3Interface priceFeedDai;
    AggregatorV3Interface priceFeedUsdt;
    AggregatorV3Interface priceFeedUsdc;

    //Eight for every currency
    int256 decimals = 8;

    //Oracles
    //DAI / USD  -  0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9
    //ETH / USD  -  0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
    //USDT / USD  -  0x3E7d1eAB13ad0104d2750B8863b489D65364e32D
    //USDC / USD  -  0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6

    //Save some info?
    event Payment(
        address payer,
        uint256 amount,
        uint256 paymentId,
        string paymentMethod,
        uint256 date
    );

    constructor(
        address _owner,
        address _daiAddress,
        address _usdtAddress,
        address _usdcAddress,
        address oracleDai,
        address oracleEth,
        address oracleUsdt,
        address oracleUsdc,
        address nftContract
    ) {
        _transferOwnership(_owner);

        //nftContract
        _nftContract = nftContract;

        //Mock tokens
        _dai = IERC20(_daiAddress);
        _usdt = IERC20(_usdtAddress);
        _usdc = IERC20(_usdcAddress);
        priceFeedDai = AggregatorV3Interface(oracleDai);
        priceFeedEth = AggregatorV3Interface(oracleEth);
        priceFeedUsdt = AggregatorV3Interface(oracleUsdt);
        priceFeedUsdc = AggregatorV3Interface(oracleUsdc);
    }

    function checkForNft(address owner) public returns (uint256) {
        uint256 num = 0; //_nftContract.balance(owner);
        if (num == 0) return 0;
        for (uint256 i = 0; i < num; i++) {
            //uint256 tokenId = tokenOfOwnerByIndex(owner,i);
            //duvida
        }

        return 10; //Enumerable
    }

    //Caso erro - abortar revert ou require

    function payWithDai() external payable {
        //Check NFT for discount
        uint256 discount = checkForNft(address(0));

        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeedDai.latestRoundData();

        //Price is in price
        //Apply discount and check balance
        uint256 daiBalance = _dai.balanceOf(msg.sender);
        //If everything is alright, just transfer
    }

    function payWithUsdt() external payable {
        //Check NFT for discount
        checkForNft(address(0));

        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeedUsdt.latestRoundData();
        //Apply discount and check balance
        uint256 usdtBalance = _usdt.balanceOf(msg.sender);

        //If everything is alright, just transfer
    }

    function payWithUsdc() external payable {
        //Check NFT for discount
        checkForNft(address(0));

        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeedUsdc.latestRoundData();

        //Apply discount and check balance
        uint256 usdcBalance = _usdc.balanceOf(msg.sender);
        //If everything is alright, just transfer
    }

    function payWithEth() external {
        //Check NFT for discount
        checkForNft(address(0));

        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeedEth.latestRoundData();

        //Apply discount and check balance
        uint256 ethBalance = msg.sender.balance;

        //If everything is alright, just transfer
    }
}