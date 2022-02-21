// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

import {IOpenSeaFactory} from "./IOpenSeaFactory.sol";

interface IOffscriptNFT {
    function mintPublic(address) external;
}

contract OpenSeaFactory is ReentrancyGuard, Ownable, IOpenSeaFactory {
    string uri;
    IOffscriptNFT nft;

    constructor(string memory _uri, IOffscriptNFT _address) {
        uri = _uri;
        nft = _address;
    }

    function mint(uint256 _optionId, address _toAddress) external nonReentrant {
        nft.mintPublic(_toAddress);
    }

    function tokenURI(uint256 _optionId) public view returns (string memory) {
        bytes memory metadata = abi.encodePacked(
            '{"attributes": {}, "description": "Offscript NFT", "name": "Offscript NFT", "external_url": "https://www.web3creatives.com", "image": "',
            uri,
            '"}'
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(metadata)
                )
            );
    }
}
