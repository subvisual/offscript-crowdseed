// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IOffscriptNFT is IERC721 {
    function traits(uint256 tokenId) external view returns (uint256 trait);
}
