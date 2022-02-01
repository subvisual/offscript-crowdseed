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
  Counters.Counter private _tokenIds;


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
    require(alreadyMint[msg.sender] == false, "You already minted.");
    alreadyMint[msg.sender] = true;
     // Get the current tokenId, this starts at 0.
    uint256 newItemId = _tokenIds.current();

     // Actually mint the NFT to the sender using msg.sender.
    _safeMint(msg.sender, newItemId);

    // Set the NFTs data.
    _setTokenURI(newItemId, "https://jsonkeeper.com/b/EY64");

    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);

    

    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();
  }





  // TEST FUNCTIONS
  function getCurrentId() public view returns(uint256){
      return _tokenIds.current();
  }




}
