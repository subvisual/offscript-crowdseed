// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract OffscriptNFT is ERC721, ERC721Enumerable, AccessControl {
    //
    // Libs
    //
    using Counters for Counters.Counter;

    //
    // Constants
    //
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    //
    // Events
    //
    event BaseURIUpdated(string newBaseURI);

    //
    // State
    //

    // private ID counter
    Counters.Counter private _idPrivate;
    // public ID counter
    Counters.Counter private _idPublic;

    // token => discount
    mapping(uint256 => uint256) public traits;

    string public baseURI;

    //Supplies
    uint8 immutable totalPublicSupply;
    uint8 public publicSupply;
    uint8 public internalSupply;

    uint8[] public discounts;
    uint8[] public availablePerTrait;

    //
    // Constructor
    //

    // We need to pass the name of our NFTs token and its symbol.
    constructor(
        string memory _baseURI,
        uint8 _publicSupply,
        uint8 _internalSupply,
        uint8[] memory _discounts,
        uint8[] memory _availablePerTrait
    ) ERC721("OffscriptNFT", "OFFSCRIPT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);

        baseURI = _baseURI;

        totalPublicSupply = _publicSupply;
        publicSupply = _publicSupply;
        internalSupply = _internalSupply;

        discounts = _discounts;
        availablePerTrait = _availablePerTrait;
    }

    //
    // Public API
    //

    function setMinter(address _minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MINTER_ROLE, _minter);
    }

    function setBaseURI(string memory _newBaseURI)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        baseURI = _newBaseURI;

        emit BaseURIUpdated(_newBaseURI);
    }

    // A function our user will hit to get their NFT.
    function mintPublic(address _address) public onlyRole(MINTER_ROLE) {
        require(publicSupply > 0, "Depleted");
        require(_idPublic.current() <= 45, "Maximum NFT's already minted");

        // increment first, to start at ID #1
        _idPublic.increment();

        // Get the current tokenId, this starts at 0.
        uint256 newItemId = _idPublic.current();

        uint8 random = uint8(
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            )
        );

        uint8 discount = calculateDiscount(random);

        _mintWithDiscount(_address, newItemId, discount);
    }

    function mintPrivate(
        address[] calldata _addresses,
        uint8[] calldata _discounts
    ) external onlyRole(MINTER_ROLE) {
        require(
            _addresses.length == _discounts.length,
            "Arrays size must be the same"
        );
        require(_addresses.length > 0, "Array must be greater than 0");
        // require(_idPrivate.current()<=105, "Maximum NFT's already minted");

        uint8 length = uint8(_addresses.length);

        require(internalSupply >= length && internalSupply > 0, "Depleted");

        for (uint8 i = 0; i < length; i++) {
            // increment first, since IDs start at #1
            _idPrivate.increment();

            _mintWithDiscount(
                _addresses[i],
                _idPrivate.current() + totalPublicSupply,
                discounts[i]
            );
            _idPrivate.increment();
            internalSupply -= 1;
        }
    }

    //
    // Internal API
    //

    function _mintWithDiscount(
        address _owner,
        uint256 _id,
        uint8 _discount
    ) internal {
        traits[_id] = _discount;
        _safeMint(_owner, _id);
    }

    function calculateDiscount(uint8 random) internal returns (uint8 discount) {
        uint8 _random = random % publicSupply;
        // 10 -> 10% // 15 -> 20% // 15 -> 30% // 4 -> 40% // 1 -> 50%
        uint8 i = 0;
        while (i < availablePerTrait.length) {
            bool aux = (_random <= availablePerTrait[i] &&
                availablePerTrait[i] > 0);
            if (aux) {
                publicSupply -= 1;
                availablePerTrait[i] -= 1;
                return discounts[i];
            } else {
                _random -= availablePerTrait[i];
            }
            i++;
        }
    }

    function _baseURI() internal view override(ERC721) returns (string memory) {
        return baseURI;
    }

    //Override functions
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, amount);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
