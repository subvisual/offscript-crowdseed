// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {
    string public baseURI;


    constructor(string memory _baseURI, address _address){
        this.baseURI = _baseURI;
        
    }

    function mint(uint256 _optionId, address _toAddress) public {
        OffscriptNFT nft = OffscriptNFT(nftAddress);
        if (_optionId == 0) {
        nft.mintOS(_toAddress);
        } 
    }

    function tokenURI(uint256 _optionId) public view returns (string){
        bytes(baseURI).length > 0
                ? string(
                    abi.encodePacked(
                        baseURI,
                        _optionId.toString()
                    )
                )
                : "";
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;

        emit BaseURIUpdated(_newBaseURI);
    }
}