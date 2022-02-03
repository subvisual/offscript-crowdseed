// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract offscriptPayment is Ownable{
    IERC20 public _dai;
    IERC20 public _usdt;
    IERC20 public _usdc;

    AggregatorV3Interface priceFeedEth;
    AggregatorV3Interface priceFeedDai;
    AggregatorV3Interface priceFeedUsdt;
    AggregatorV3Interface priceFeedUsdc;


    //Eight for every currency
    int decimals = 8;

    //Oracles
    //DAI / USD  -  0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9
    //ETH / USD  -  0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
    //USDT / USD  -  0x3E7d1eAB13ad0104d2750B8863b489D65364e32D
    //USDC / USD  -  0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6

    //Save some info?
    event Payment(
        address payer,
        uint amount,
        uint paymentId,
        string paymentMethod,
        uint date
    );


    constructor(address _owner, address _daiAddress, address _usdtAddress ,address _usdcAddress, address oracleDai, address oracleEth, address oracleUsdt, address oracleUsdc){
        _transferOwnership(_owner);

        //Mock tokens
        _dai = IERC20(_daiAddress);
        _usdt = IERC20(_usdtAddress);
        _usdc = IERC20(_usdcAddress);
        priceFeedDai = AggregatorV3Interface(0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9);
        priceFeedEth = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
        priceFeedUsdt = AggregatorV3Interface(0x3E7d1eAB13ad0104d2750B8863b489D65364e32D);
        priceFeedUsdc = AggregatorV3Interface(0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6);
    }

    function checkForNft(address owner) public returns(uint discont){
        
        return 10;
    }



    function payWithDai() external{
        //Check NFT for discount
        checkForNft(address(0));
        
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeedDai.latestRoundData();

        //Price is in price

        //Apply discount and check balance

        //If everything is alright, just transfer

    }

    function payWithUsdt() external{
        //Check NFT for discount
        checkForNft(address(0));
        
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeedUsdt.latestRoundData();
        //Apply discount and check balance

        //If everything is alright, just transfer

    }

    function payWithUsdc() external{
        //Check NFT for discount
        checkForNft(address(0));
        
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeedUsdc.latestRoundData();

        //Apply discount and check balance

        //If everything is alright, just transfer

    }

    function payWithEth() external{
        //Check NFT for discount
        checkForNft(address(0));
        
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeedEth.latestRoundData();

        //Apply discount and check balance
        

        //If everything is alright, just transfer

    }



}