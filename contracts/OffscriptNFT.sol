// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract offscriptNFT is ERC721URIStorage, Ownable {
  // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds; // ID tokens
  Counters.Counter private _idInside; // contador para os reservados
  Counters.Counter private _idPublic; // contador dos minted aberto

//token to discount
  mapping(uint => uint) public traits;

  //balance address -> token
  mapping(address => uint) public balance;

  //Supplies
  uint totalSupply = 150; //static
  uint normalMint = 45; 

  uint discount10 = 10;
  uint discount20 = 15;
  uint discount30 = 15;
  uint discount50 = 4;
  uint discount100 = 1;

  //Acomulativo 


  //NFT data
  struct Data {
        uint256 id;
        address owner;
        string uri;
    }

  mapping(address => bool) public alreadyMint;  

  // We need to pass the name of our NFTs token and its symbol.
  constructor(address _owner) ERC721 ("offscriptNFT", "OFFSCRIPT") {
    _transferOwnership(_owner);

    console.log("This is my NFT contract. Woah!");
  }

  // A function our user will hit to get their NFT.
  function makeNFT() public {
    //Duvida, mint uma vez
    //require(alreadyMint[msg.sender] == false, "You already minted.");
    //alreadyMint[msg.sender] = true;
     
    uint random = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));

    //0 - 45;
    random = random % normalMint;
    // 10 -> 10% // 15 -> 20% // 15 -> 30% // 4 -> 50% // 1 -> 100%
    if(random < discount10){
      totalSupply -= 1;
      normalMint -= 1;
      discount10 -= 1;
      traits[newItemId] = 10;
    }
    else if(random >= discount10 && random < discount10+discount20){
      totalSupply -= 1;
      normalMint -= 1;
      discount20 -= 1;
      traits[newItemId] = 20;
    }
    else if(random >= discount10+discount20 + 1 && random < discount10+discount20+discount30){
      totalSupply -= 1;
      normalMint -= 1;
      discount30 -= 1;
      traits[newItemId] = 30;
    }
    else if(random >= discount10+discount20+discount30 && random < discount10+discount20+discount30+discount50){
      totalSupply -= 1;
      normalMint -= 1;
      discount50 -= 1;
      traits[newItemId] = 50;
    }
    else if(random >= discount10+discount20+discount30+discount50){
      totalSupply -= 1;
      normalMint -= 1;
      discount100 -= 1;
      traits[newItemId] = 100;
    }
    //completar


    // Get the current tokenId, this starts at 0.
    uint256 newItemId = _tokenIds.current();

    require(_idPublic.current()<=45, "Maximum NFT's already minted");

     // Actually mint the NFT to the sender using msg.sender.
    _safeMint(msg.sender, newItemId);

    // Set the NFTs data.
    _setTokenURI(newItemId, "data:application/json;base64,ewogICAgIm5hbWUiOiAiT2Zmc2NyaXB0IE5GVCIsCiAgICAiZGVzY3JpcHRpb24iOiAiR2V0IGRpc2NvdW50IHdpdGggdGhpcyBiZWF1dHkuIiwKICAgICJpbWFnZSI6IAoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNEtJQ0FnSUR4emRIbHNaVDR1WW1GelpTQjdJR1pwYkd3NklIZG9hWFJsT3lCbWIyNTBMV1poYldsc2VUb2djMlZ5YVdZN0lHWnZiblF0YzJsNlpUb2dNVFJ3ZURzZ2ZUd3ZjM1I1YkdVK0NpQWdJQ0E4Y21WamRDQjNhV1IwYUQwaU1UQXdKU0lnYUdWcFoyaDBQU0l4TURBbElpQm1hV3hzUFNKaWJHRmpheUlnTHo0S0lDQWdJRHgwWlhoMElIZzlJalV3SlNJZ2VUMGlOVEFsSWlCamJHRnpjejBpWW1GelpTSWdaRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlJbTFwWkdSc1pTSWdkR1Y0ZEMxaGJtTm9iM0k5SW0xcFpHUnNaU0krVDJabWMyTnlhWEIwUEM5MFpYaDBQZ284TDNOMlp6ND0iCiAgICAiYXR0cmlidXRlcyI6IFsKICAgICAgICAidmFsdWUiOiAiw4Fydm9yZSIsCnsKICAgICAgICAidHJhaXRfdHlwZSI6ICJQcmljZSIsIAogICAgICAidmFsdWUiOiAiMzAsMDAkIgp9CgpdCn0=");

    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);

    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();
    _idPublic.increment();
  }

  function mintInternal(adress[] _adresses, uint[] discount) public onlyOwner{
    uint256 newItemId = _tokenIds.current();
    
    require(_adress.length==discount.lenght,"Arrays size must be the same");
    require(_adress.length>0,"Array must be greater than 0");
    require(discount.length>0,"Array must be greater than 0");
    require(_idInside.current()<=105, "Maximum NFT's already minted");

    uint256 length = _adresses.length;

    for(uint256 i = 1; i < lenght; i++) {
      MintNew(_adress[i], newItemId, discount[i]);
  }

  // TEST FUNCTIONS
  function getCurrentId() public view returns(uint256){
      return _tokenIds.current();
  }




}
