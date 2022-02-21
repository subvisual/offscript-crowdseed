// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import {IOpenSeaFactoryERC721} from "./IOpenSeaFactoryERC721.sol";
import {IProxyRegistry} from "./IProxyRegistry.sol";

interface IOffscriptNFT {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function remainingPublicSupply() external view returns (uint8);

    function mintPublic(address) external;
}

contract OpenSeaFactory is
    ReentrancyGuard,
    Ownable,
    ERC165,
    IOpenSeaFactoryERC721
{
    //
    // Constants
    //
    uint256 constant NUM_OPTIONS = 1;

    //
    // Events
    //
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    //
    // State
    //
    string uri;
    IOffscriptNFT nft;
    IProxyRegistry proxyRegistry;

    //
    // Constructor
    //
    constructor(
        string memory _uri,
        IOffscriptNFT _address,
        IProxyRegistry _proxyRegistry
    ) {
        uri = _uri;
        nft = _address;
        proxyRegistry = _proxyRegistry;

        fireTransferEvents(address(0), owner());
    }

    function fireTransferEvents(address _from, address _to) internal {
        for (uint256 i = 0; i < NUM_OPTIONS; i++) {
            emit Transfer(_from, _to, i);
        }
    }

    //
    // IOpenSeaFactoryERC721
    //

    /// @inheritdoc IOpenSeaFactoryERC721
    function name()
        external
        view
        override(IOpenSeaFactoryERC721)
        returns (string memory)
    {
        return nft.name();
    }

    /// @inheritdoc IOpenSeaFactoryERC721
    function symbol()
        external
        view
        override(IOpenSeaFactoryERC721)
        returns (string memory)
    {
        return nft.symbol();
    }

    /// @inheritdoc IOpenSeaFactoryERC721
    function tokenURI(
        uint256 /*_optionId*/
    ) external view override(IOpenSeaFactoryERC721) returns (string memory) {
        bytes memory metadata = abi.encodePacked(
            '{"description": "TODO", ',
            '"name": "TODO"',
            '"external_url": "https://www.web3creatives.com", ',
            '"image": "',
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

    // @inhericdoc IOpenSeaFactoryERC721
    function numOptions()
        public
        view
        override(IOpenSeaFactoryERC721)
        returns (uint256)
    {
        return NUM_OPTIONS;
    }

    /// @inheritdoc IOpenSeaFactoryERC721
    function supportsFactoryInterface()
        public
        pure
        override(IOpenSeaFactoryERC721)
        returns (bool)
    {
        return true;
    }

    /// @inheritdoc IOpenSeaFactoryERC721
    function canMint(uint256 _optionId)
        public
        view
        override(IOpenSeaFactoryERC721)
        returns (bool)
    {
        return _optionId < NUM_OPTIONS && nft.remainingPublicSupply() > 0;
    }

    /// @inheritdoc IOpenSeaFactoryERC721
    function mint(uint256 _optionId, address _toAddress) public nonReentrant {
        require(_isOwnerOrProxy(msg.sender), "not authorized");

        require(canMint(_optionId), "cannot mint");

        nft.mintPublic(_toAddress);
    }

    //
    // ERC165
    //

    /// @inheritdoc ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        pure
        override(IERC165, ERC165)
        returns (bool)
    {
        return interfaceId == type(IOpenSeaFactoryERC721).interfaceId;
    }

    //
    // Internal API
    //

    function _isOwnerOrProxy(address _addr) internal view returns (bool) {
        return
            address(proxyRegistry.proxies(owner())) == _addr ||
            owner() == _addr;
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use transferFrom so the frontend doesn't have to worry about different method names.
     */
    function transferFrom(
        address,
        address _to,
        uint256 _tokenId
    ) public {
        mint(_tokenId, _to);
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        returns (bool)
    {
        if (owner() == _owner && _owner == _operator) {
            return true;
        }

        if (_isOwnerOrProxy(_operator)) {
            return true;
        }

        return false;
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function ownerOf(uint256) public view returns (address _owner) {
        return owner();
    }
}
