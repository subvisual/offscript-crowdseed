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
  uint public publicSupply;
  uint public internalSupply;

  // { 10 => 10, 20 => 15, 30 => 15, 50 => 4, 100 => 1}
  uint[] public discounts;
  uint[] public availablePerTrait;


  // We need to pass the name of our NFTs token and its symbol.
  constructor(address _owner, string memory _baseURI, uint _publicSupply, uint _internalSupply, uint[] memory _discounts, uint[] memory _availablePerTrait) ERC721("OffscriptNFT", "OFFSCRIPT") Ownable() {
    //console.log("This is my NFT contract. Woah!");

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

    // Set the NFTs data.
    // _setTokenURI(newItemId, "data:application/json;base64,ewogICAgIm5hbWUiOiAiT2Zmc2NyaXB0IE5GVCIsCiAgICAiZGVzY3JpcHRpb24iOiAiR2V0IGRpc2NvdW50IHdpdGggdGhpcyBiZWF1dHkuIiwKICAgICJpbWFnZSI6IAoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNEtJQ0FnSUR4emRIbHNaVDR1WW1GelpTQjdJR1pwYkd3NklIZG9hWFJsT3lCbWIyNTBMV1poYldsc2VUb2djMlZ5YVdZN0lHWnZiblF0YzJsNlpUb2dNVFJ3ZURzZ2ZUd3ZjM1I1YkdVK0NpQWdJQ0E4Y21WamRDQjNhV1IwYUQwaU1UQXdKU0lnYUdWcFoyaDBQU0l4TURBbElpQm1hV3hzUFNKaWJHRmpheUlnTHo0S0lDQWdJRHgwWlhoMElIZzlJalV3SlNJZ2VUMGlOVEFsSWlCamJHRnpjejBpWW1GelpTSWdaRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlJbTFwWkdSc1pTSWdkR1Y0ZEMxaGJtTm9iM0k5SW0xcFpHUnNaU0krVDJabWMyTnlhWEIwUEM5MFpYaDBQZ284TDNOMlp6ND0iCiAgICAiYXR0cmlidXRlcyI6IFsKICAgICAgICAidmFsdWUiOiAiw4Fydm9yZSIsCnsKICAgICAgICAidHJhaXRfdHlwZSI6ICJQcmljZSIsIAogICAgICAidmFsdWUiOiAiMzAsMDAkIgp9CgpdCn0=");

    console.log("An NFT w/ ID %s has been minted to %s with discount %s", newItemId, msg.sender, discount);

    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();
    _idPublic.increment();
  }


  function mintInternal(address[] calldata _addresses, uint[] calldata _discounts) external onlyOwner {
    require(_addresses.length==_discounts.length,"Arrays size must be the same");
    require(_addresses.length>0,"Array must be greater than 0");
    // require(_idInside.current()<=105, "Maximum NFT's already minted");

    uint256 length = _addresses.length;

    require(internalSupply >= length, "Depleted");

    for(uint256 i = 1; i < length; i++) {
      _mintWithDiscount(_addresses[i], _idInside.current() + totalPublicSupply, discounts[i]);
      _idInside.increment();
      internalSupply -= 1;
    }
  }


  function _mintWithDiscount(address _owner, uint256 _id, uint256 _discount) internal {
    traits[_id] = _discount;
    _safeMint(_owner, _id);
  }

  function calculateDiscount(uint random) internal returns(uint discount){
    uint _random = random % publicSupply;
    console.log("Random is %s" , _random);
    // 10 -> 10% // 15 -> 20% // 15 -> 30% // 4 -> 40% // 1 -> 50%
    uint i = 0;
    while(i < availablePerTrait.length){
      console.log("Random inside is %s" , _random);
      bool aux = (_random <= availablePerTrait[i] && availablePerTrait[i] > 0);
      if(aux){
        publicSupply -= 1;
        availablePerTrait[i] -= 1;
        return discounts[i];
      }
      else{
        _random -= availablePerTrait[i];
      }
      i++;
    }
  }


  



  //Override functions
  function _beforeTokenTransfer(address from, address to, uint256 amount) internal override(ERC721, ERC721Enumerable){
      super._beforeTokenTransfer(from,to,amount);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721,ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}