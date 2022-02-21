// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

// We first import some OpenZeppelin Contracts.
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {Trust} from "./Trust.sol";

contract OffscriptNFT is ERC721, Trust {
    //
    // Events
    //

    /// Emitted when the base URI changes
    event BaseURIUpdated(string newBaseURI);

    //
    // State
    //

    // token => discount
    mapping(uint256 => uint256) public traits;

    /// Base URI for all NFTs
    string public baseURI;

    //Supplies
    uint8 public immutable totalPublicSupply;
    uint8 public remainingPublicSupply;
    uint8 public nextPrivateID;

    uint8[] public discounts;
    uint8[] public availablePerTrait;

    //
    // Constructor
    //

    // We need to pass the name of our NFTs token and its symbol.
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint8 _remainingPublicSupply,
        uint8[] memory _discounts,
        uint8[] memory _availablePerTrait
    ) ERC721(_name, _symbol) Trust(msg.sender) {
        baseURI = _baseURI;

        totalPublicSupply = _remainingPublicSupply;
        remainingPublicSupply = _remainingPublicSupply;
        nextPrivateID = totalPublicSupply + 1;

        discounts = _discounts;
        availablePerTrait = _availablePerTrait;

        emit BaseURIUpdated(_baseURI);
    }

    //
    // ERC721
    //

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        uint256 discount = traits[tokenId];

        bytes memory metadata = abi.encodePacked(
            '{"attributes": {"discount": ',
            Strings.toString(discount),
            '}, "image": "',
            baseURI,
            Strings.toString(tokenId),
            '.png"}'
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(metadata)
                )
            );
    }

    //
    // Public API
    //

    /**
     * Updates the base URI
     *
     * @notice Only callable by an authorized operator
     *
     * @param _newBaseURI new base URI for the token
     */
    function setBaseURI(string memory _newBaseURI) public requiresTrust {
        baseURI = _newBaseURI;

        emit BaseURIUpdated(_newBaseURI);
    }

    // A function our user will hit to get their NFT.
    function mintPublic(address _address) public requiresTrust {
        require(remainingPublicSupply > 0, "Depleted");

        // IDs from from #1 to #totalPublicSupply
        uint256 newItemId = uint256(
            totalPublicSupply - remainingPublicSupply + 1
        );

        uint8 random = uint8(
            uint256(
                keccak256(
                    abi.encodePacked(
                        msg.sender,
                        tx.origin,
                        block.difficulty,
                        block.timestamp
                    )
                )
            )
        );

        uint8 discount = calculateDiscount(random);

        _mintWithDiscount(_address, newItemId, discount);
        remainingPublicSupply--;
    }

    function mintPrivate(
        address[] calldata _addresses,
        uint8[] calldata _discounts
    ) external requiresTrust {
        require(
            _addresses.length == _discounts.length,
            "Arrays size must be the same"
        );
        require(_addresses.length > 0, "Array must be greater than 0");

        uint8 length = uint8(_addresses.length);

        for (uint8 i = 0; i < length; i++) {
            uint256 newItemID = uint256(nextPrivateID);

            _mintWithDiscount(_addresses[i], newItemID, discounts[i]);
            nextPrivateID++;
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

    function calculateDiscount(uint8 _random)
        internal
        returns (uint8 discount)
    {
        _random %= remainingPublicSupply;

        uint8 i = 0;
        uint8 length = uint8(availablePerTrait.length);
        while (i < length) {
            uint8 available = availablePerTrait[i];
            if (_random < available) {
                availablePerTrait[i]--;
                return discounts[i];
            } else {
                _random -= available;
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
    ) internal override(ERC721) {
        super._beforeTokenTransfer(from, to, amount);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
