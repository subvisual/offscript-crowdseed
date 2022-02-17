// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IFactory} form "./IFactory.sol";

interface IOffscriptNFT {
    function mintPublic(
        address
    ) external;
}

contract Factory is Ownable, IFactory {
    string public baseURI;
    IOffscriptNFT nft;

    constructor(string memory _baseURI, address _address){
        this.baseURI = _baseURI;
        nft = IOffscriptNFT(_address);
    }

    function mint(uint256 _optionId, address _toAddress) public {
        if (_optionId == 0) {
        nft.mintPublic(_toAddress);
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