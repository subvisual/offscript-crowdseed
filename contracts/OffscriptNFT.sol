// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract OffscriptNFT is ERC721, ERC721Enumerable, Ownable {
  // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds; // ID tokens
  Counters.Counter private _idInside; // contador para os reservados
  Counters.Counter private _idPublic; // contador dos minted aberto

  // token to discount
  mapping(uint => uint) public traits;

  string public baseURI;

  //Supplies
  uint immutable totalPublicSupply;
  uint publicSupply;
  uint internalSupply;

  // { 10 => 10, 20 => 15, 30 => 15, 50 => 4, 100 => 1}
  /*uint discount10 = 10;
  uint discount20 = 15;
  uint discount30 = 15;
  uint discount50 = 4;
  uint discount100 = 1;*/

  uint[] discounts;
  uint[] availablePerTrait;


  // We need to pass the name of our NFTs token and its symbol.
  constructor(address _owner, string memory _baseURI, uint _publicSupply, 
  uint _internalSupply, uint[] memory _discounts, 
  uint[] memory _availablePerTrait) ERC721("OffscriptNFT", "OFFSCRIPT") Ownable() {
    console.log("This is my NFT contract. Woah!");

    baseURI = _baseURI;
    totalPublicSupply = _publicSupply;
    publicSupply = _publicSupply;
    internalSupply = _internalSupply;

    discounts = _discounts;
    availablePerTrait = _availablePerTrait;
  }

  // A function our user will hit to get their NFT.
  function mintPublic() public {
    require(publicSupply > 0, "Depleted");
    require(_idPublic.current()<=45, "Maximum NFT's already minted");

    uint random = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));

    // Get the current tokenId, this starts at 0.
    uint256 newItemId = _tokenIds.current();


    uint discount = calculateDiscount(random);


    traits[newItemId] = discount;
     // Actually mint the NFT to the sender using msg.sender.
    _safeMint(msg.sender, newItemId);

    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);

    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();
    _idPublic.increment();
  }

  // Mint reserved NFTs
  function mintInternal(address[] calldata _addresses, uint[] calldata _discounts) external onlyOwner {
    require(_addresses.length==_discounts.length,"Arrays size must be the same");
    require(_addresses.length>0,"Array must be greater than 0");
    // require(_idInside.current()<=105, "Maximum NFT's already minted");

    uint256 length = _addresses.length;

    require(internalSupply >= length && internalSupply > 0, "Depleted");

    for(uint256 i = 0; i < length; i++) {
      _mintWithDiscount(_addresses[i], _idInside.current() + totalPublicSupply, discounts[i]);
      _idInside.increment();
      internalSupply -= 1;
    }
  }


  function _mintWithDiscount(address _owner, uint256 _id, uint256 _discount) internal {
    traits[_id] = _discount;
    _safeMint(_owner, _id);
  }

  function calculateDiscount(uint random) internal returns(uint256){
      uint _random = random % publicSupply;
    // 10 -> 10% // 15 -> 20% // 15 -> 30% // 4 -> 50% // 1 -> 100%
    uint i = 0;
    while(i < availablePerTrait.length){
      uint aux = availablePerTrait[i] - _random;
      if(aux > 0){
        publicSupply -= 1;
        availablePerTrait[i] -= 1;
        return discounts[i];
      }
      else
        _random -= availablePerTrait[i];
    }
  }

  // retorna o desconto associado a um tokenID
  function getDiscount(uint tokenID) public view returns (uint256){
    return traits[tokenID];
  }

  //Override functions
  function _beforeTokenTransfer(address from, address to, uint256 amount) internal override(ERC721, ERC721Enumerable){
      super._beforeTokenTransfer(from,to,amount);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721,ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}