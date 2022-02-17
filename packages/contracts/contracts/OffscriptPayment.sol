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

    uint8 ticketPrice;

    AggregatorV3Interface priceFeedEth;
    AggregatorV3Interface priceFeedDai;
    AggregatorV3Interface priceFeedUsdt;
    AggregatorV3Interface priceFeedUsdc;

    mapping(address => address) oracles;

    //Oracles
    //DAI / USD  -  0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9
    //ETH / USD  -  0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
    //USDT / USD  -  0x3E7d1eAB13ad0104d2750B8863b489D65364e32D
    //USDC / USD  -  0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6

    //Save some info?
    event Payment(
        address payer,
        uint8 amount,
        uint8 nftId,
        address tokenId
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
        address nftContract,
        uint8 _ticketPrice
    ) {
        _transferOwnership(_owner);

        //nftContract
        _nftContract = nftContract;

        //Mock tokens
        _dai = IERC20(_daiAddress);
        _usdt = IERC20(_usdtAddress);
        _usdc = IERC20(_usdcAddress);

        oracles[address(_dai)] = oracleDai;
        oracles[address(_usdt)] = oracleUsdt;
        oracles[address(_usdc)] = oracleUsdc;
        oracles[address(0x0)] = oracleEth;

        ticketPrice = _ticketPrice;
    }

    function checkForNft(address owner) public returns (uint8,uint8) {
        uint8 num = _nftContract.balanceOf(owner);
        uint8 discount = 0;
        uint8 tokenId = 0;
        for (uint8 i = 0; i < num; i++) {
            uint8 aux = _nftContract.tokenOfOwnerByIndex(owner, i);
            uint8 aux2 = _nftContract.traits(aux);
            if(aux2 > discount){
                discount = aux2;
                tokenId = aux;
            }
        }

        return (discount,tokenId);
    }

    function payWithEth() external payable {
        AggregatorV3Interface oracle = AggregatorV3Interface(
            oracles[address(0x0)]
        );

        uint8 decimals = 18;
        uint8 oracleDecimals = oracle.decimals();

        (uint discount, uint nftId) = checkForNft(msg.sender);

        // call oracle & compute price
        (
            uint80 roundID,
            int256 price,
            uint8 startedAt,
            uint8 timeStamp,
            uint80 answeredInRound
        ) = oracle.latestRoundData();

        //Falta aplicar o desconto
        discount = discount * 10**(decimals-2);

        // ((target*1e8) / oracle_price) * (currency_decimal - oracle_decimals)
        uint8 amount = ((ticketPrice * 10**oracleDecimals) / price) *
            10**(decimals - oracleDecimals);

        uint8 discountInValue = amount * discount;

        emit Payment(msg.sender, amount-discountInValue, nftId, 0);
    }

    function paytWithERC20(address _token) external {
        require(_token != address(0x0));
        AggregatorV3Interface oracle = AggregatorV3Interface(oracles[_token]);

        require(address(oracle) != address(0x0), "token not supported");

        uint8 decimals = IERC20(_token).decimals();
        uint8 oracleDecimals = oracle.decimals();

        (uint discount, uint nftId) = checkForNft(msg.sender);

        // call oracle & compute price
        (
            uint80 roundID,
            int256 price,
            uint8 startedAt,
            uint8 timeStamp,
            uint80 answeredInRound
        ) = oracle.latestRoundData();


        discount = discount * 10**(decimals-2);
        

        // ((target*1e8) / oracle_price) * (currency_decimal - oracle_decimals)
        uint8 amount = ((ticketPrice * 10**oracleDecimals) *
            10**(decimals - oracleDecimals)) / price;
    
        uint8 discountInValue = amount * discount;

        IERC20(_token).safeTransferFrom(msg.sender, address(this), amount-discountInValue);

        emit Payment(msg.sender, amount-discountInValue, nftId, _token);
    }

    //Caso erro - abortar revert ou require

    function withdraw() external onlyOwner {
        _dai.safeTransfer(msg.sender, _dai.balanceOf(address(this)));
        _usdt.safeTransfer(msg.sender, _usdt.balanceOf(address(this)));
        _usdc.safeTransfer(msg.sender, _usdc.balanceOf(address(this)));
        payable(msg.sender).transfer(this.balance);
    }
}