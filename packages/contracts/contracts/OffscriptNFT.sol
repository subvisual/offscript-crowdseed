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
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _idInside; // contador para os reservados
    Counters.Counter private _idPublic; // contador dos minted aberto

    // token to discount
    mapping(uint8 => uint8) public traits;

    string public baseURI;

    //Supplies
    uint8 immutable totalPublicSupply;
    uint8 public publicSupply;
    uint8 public internalSupply;

    // { 10 => 10, 20 => 15, 30 => 15, 50 => 4, 100 => 1}
    uint8[] public discounts;
    uint8[] public availablePerTrait;

     event BaseURIUpdated(string newBaseURI);

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
        //console.log("This is my NFT contract. Woah!");

        baseURI = _baseURI;

        totalPublicSupply = _publicSupply;
        publicSupply = _publicSupply;
        internalSupply = _internalSupply;

        discounts = _discounts;
        availablePerTrait = _availablePerTrait;
    }

    function setMinter(address _minter) onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MINTER_ROLE, _minter);
    }

    // A function our user will hit to get their NFT.
    function mintPublic(
        /* TODO address */
    ) public onlyRole(MINTER_ROLE) {
        require(publicSupply > 0, "Depleted");
        require(_idPublic.current() <= 45, "Maximum NFT's already minted");

        uint8 random = uint8(uint256(
            keccak256(abi.encodePacked(block.difficulty, block.timestamp))
        ));

        // Get the current tokenId, this starts at 0.
        uint8 newItemId = uint8(_idPublic.current());

        uint8 discount = calculateDiscount(random);

        _mintWithDiscount(msg.sender, newItemId, discount);

        console.log(
            "An NFT w/ ID %s has been minted to %s with discount %s",
            newItemId,
            msg.sender,
            discount
        );

        // Increment the counter for when the next NFT is minted.
        _idPublic.increment();
    }

    function mintInternal(
        address[] calldata _addresses,
        uint8[] calldata _discounts
    ) external onlyRole(MINTER_ROLE) {
        require(
            _addresses.length == _discounts.length,
            "Arrays size must be the same"
        );
        require(_addresses.length > 0, "Array must be greater than 0");
        // require(_idInside.current()<=105, "Maximum NFT's already minted");

        uint8 length = uint8(_addresses.length);

        require(internalSupply >= length && internalSupply > 0, "Depleted");

        for (uint8 i = 0; i < length; i++) {
            _mintWithDiscount(
                _addresses[i],
                uint8(_idInside.current() + totalPublicSupply),
                discounts[i]
            );
            _idInside.increment();
            internalSupply -= 1;
        }
    }

    function _mintWithDiscount(
        address _owner,
        uint8 _id,
        uint8 _discount
    ) internal {
        traits[_id] = _discount;
        _safeMint(_owner, _id);
    }

    function calculateDiscount(uint8 random)
        internal
        returns (uint8 discount)
    {
        uint8 _random = random % publicSupply;
        console.log("Random is %s", _random);
        // 10 -> 10% // 15 -> 20% // 15 -> 30% // 4 -> 40% // 1 -> 50%
        uint8 i = 0;
        while (i < availablePerTrait.length) {
            console.log("Random inside is %s", _random);
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

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;

        emit BaseURIUpdated(_newBaseURI);
    }

    //
    /*function tokenURI(uint256 tokenID) public view override(ERC721) returns (string memory) {
      bytes(baseURI).length > 0
                ? string(
                    abi.encodePacked(
                        baseURI,
                        tokenID.toString()
                    )
                )
                : "";
    }*/

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
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}