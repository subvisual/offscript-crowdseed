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

    mapping(address => address) oracles;

    //Oracles
    //DAI / USD  -  0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9
    //ETH / USD  -  0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
    //USDT / USD  -  0x3E7d1eAB13ad0104d2750B8863b489D65364e32D
    //USDC / USD  -  0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6

    //Save some info?
    event TicketSold(address, uint256);
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

        oracles[_dai] = oracleDai;
        oracles[_usdt] = oracleUsdt;
        oracles[_usdc] = oracleUsdc;
        oracles[address(0x0)] = oracleEth;

        priceFeedDai = AggregatorV3Interface(oracleDai);
        priceFeedEth = AggregatorV3Interface(oracleEth);
        priceFeedUsdt = AggregatorV3Interface(oracleUsdt);
        priceFeedUsdc = AggregatorV3Interface(oracleUsdc);
    }

    function checkForNft(address owner) public returns (uint256) {
        uint256 num = _nftContract.balanceOf(owner);
        uint256 discount = 0;
        for (uint256 i = 0; i < num; i++) {
            uint256 tokenId = _nftContract.tokenOfOwnerByIndex(owner, i);
            discount = _nftContract.traits(tokenId);
        }

        return discount;
    }

    function payWithEth(uint256 ticketPrice) external payable {
        AggregatorV3Interface oracle = AggregatorV3Interface(
            oracles[address(0x0)]
        );

        uint256 decimals = eth.decimals();
        uint256 oracleDecimals = oracle.decimals();

        // call oracle & compute price
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = oracle.latestRoundData();

        // ((target*1e8) / oracle_price) * (currency_decimal - oracle_decimals)
        uint256 amount = ((ticketPrice * 10**oracleDecimals) / price) *
            10**(decimals - oracleDecimals);

        emit PaidWithEth(msg.sender, nftId, amount);
    }

    function paytWithERC20(address _token, uint256 ticketPrice) external {
        require(_token != address(0x0));
        AggregatorV3Interface oracle = AggregatorV3Interface(oracles[_token]);

        require(address(oracle) != address(0x0), "token not supported");

        uint256 decimals = IERC20(_token).decimals();
        uint256 oracleDecimals = oracle.decimals();

        // call oracle & compute price
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = oracle.latestRoundData();

        // ((target*1e8) / oracle_price) * (currency_decimal - oracle_decimals)
        uint256 amount = ((ticketPrice * 10**oracleDecimals) *
            10**(decimals - oracleDecimals)) / price;

        IERC20(_token).safeTransferFrom(msg.sender, address(this), amount);

        emit PaidWithERC20(msg.sender, _token, nftId, amount);
    }

    //Caso erro - abortar revert ou require

    function withdraw() external onlyOwner {
        _dai.safeTransfer(msg.sender, _dai.balanceOf(address(this)));
        _usdt.safeTransfer(msg.sender, _usdt.balanceOf(address(this)));
        _usdc.safeTransfer(msg.sender, _usdc.balanceOf(address(this)));
        payable(msg.sender).transfer(this.balance);
    }
}