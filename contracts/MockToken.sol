// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20{


    constructor(
        uint256 amount, 
        string memory _name, 
        string memory _symbol
        ) 
        ERC20(_name,_symbol)
        {
            _mint(msg.sender, amount);
    }
}