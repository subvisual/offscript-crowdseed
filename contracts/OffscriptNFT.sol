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

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  // token to discount
  mapping(uint => uint) public traits;
>>>>>>> da9f0ca2355ecf509b56a5cbd7dee8d421e4e17c
=======
    // token to discount
    mapping(uint256 => uint256) public traits;
>>>>>>> f033b8c88bdf16a69622e6164e730ed2ffd95b1f

    string public baseURI;

<<<<<<< HEAD
<<<<<<< HEAD
  //NFT data
  struct Data {
        uint256 id;
        address owner;
        string uri;
    }

  mapping(address => bool) public alreadyMint;  
=======
  //Supplies
  uint immutable totalPublicSupply;
  uint publicSupply;
  uint internalSupply;
=======
    //Supplies
    uint256 immutable totalPublicSupply;
    uint256 public publicSupply;
    uint256 public internalSupply;
>>>>>>> f033b8c88bdf16a69622e6164e730ed2ffd95b1f

    // { 10 => 10, 20 => 15, 30 => 15, 50 => 4, 100 => 1}
    /*uint discount10 = 10;
  uint discount20 = 15;
  uint discount30 = 15;
  uint discount50 = 4;
  uint discount100 = 1;*/

    uint256[] public discounts;
    uint256[] public availablePerTrait;

<<<<<<< HEAD
>>>>>>> da9f0ca2355ecf509b56a5cbd7dee8d421e4e17c
=======
    // We need to pass the name of our NFTs token and its symbol.
    constructor(
        address _owner,
        string memory _baseURI,
        uint256 _publicSupply,
        uint256 _internalSupply,
        uint256[] memory _discounts,
        uint256[] memory _availablePerTrait
    ) ERC721("Offscript NFT", "OFFSCRIPT") Ownable() {
        console.log("This is my NFT contract. Woah!");
>>>>>>> f033b8c88bdf16a69622e6164e730ed2ffd95b1f

        baseURI = _baseURI;
        totalPublicSupply = _publicSupply;
        publicSupply = _publicSupply;
        internalSupply = _internalSupply;

<<<<<<< HEAD
    baseURI = _baseURI;
    totalPublicSupply = _publicSupply;
    publicSupply = _publicSupply;
    internalSupply = _internalSupply;

    discounts = _discounts;
    availablePerTrait = _availablePerTrait;
  }

  // A function our user will hit to get their NFT.
<<<<<<< HEAD
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

=======
  function mintPublic() public {
    require(publicSupply > 0, "Depleted");
    require(_idPublic.current()<=45, "Maximum NFT's already minted");

    uint random = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));

    // Get the current tokenId, this starts at 0.
    uint256 newItemId = _tokenIds.current();


    uint discount = calculateDiscount(random);


    traits[newItemId] = discount;
>>>>>>> da9f0ca2355ecf509b56a5cbd7dee8d421e4e17c
     // Actually mint the NFT to the sender using msg.sender.
    _safeMint(msg.sender, newItemId);

    // Set the NFTs data.
<<<<<<< HEAD
    _setTokenURI(newItemId, "data:application/json;base64,ewogICAgIm5hbWUiOiAiT2Zmc2NyaXB0IE5GVCIsCiAgICAiZGVzY3JpcHRpb24iOiAiR2V0IGRpc2NvdW50IHdpdGggdGhpcyBiZWF1dHkuIiwKICAgICJpbWFnZSI6IAoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNEtJQ0FnSUR4emRIbHNaVDR1WW1GelpTQjdJR1pwYkd3NklIZG9hWFJsT3lCbWIyNTBMV1poYldsc2VUb2djMlZ5YVdZN0lHWnZiblF0YzJsNlpUb2dNVFJ3ZURzZ2ZUd3ZjM1I1YkdVK0NpQWdJQ0E4Y21WamRDQjNhV1IwYUQwaU1UQXdKU0lnYUdWcFoyaDBQU0l4TURBbElpQm1hV3hzUFNKaWJHRmpheUlnTHo0S0lDQWdJRHgwWlhoMElIZzlJalV3SlNJZ2VUMGlOVEFsSWlCamJHRnpjejBpWW1GelpTSWdaRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlJbTFwWkdSc1pTSWdkR1Y0ZEMxaGJtTm9iM0k5SW0xcFpHUnNaU0krVDJabWMyTnlhWEIwUEM5MFpYaDBQZ284TDNOMlp6ND0iCiAgICAiYXR0cmlidXRlcyI6IFsKICAgICAgICAidmFsdWUiOiAiw4Fydm9yZSIsCnsKICAgICAgICAidHJhaXRfdHlwZSI6ICJQcmljZSIsIAogICAgICAidmFsdWUiOiAiMzAsMDAkIgp9CgpdCn0=");
=======
    // _setTokenURI(newItemId, "data:application/json;base64,ewogICAgIm5hbWUiOiAiT2Zmc2NyaXB0IE5GVCIsCiAgICAiZGVzY3JpcHRpb24iOiAiR2V0IGRpc2NvdW50IHdpdGggdGhpcyBiZWF1dHkuIiwKICAgICJpbWFnZSI6IAoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNEtJQ0FnSUR4emRIbHNaVDR1WW1GelpTQjdJR1pwYkd3NklIZG9hWFJsT3lCbWIyNTBMV1poYldsc2VUb2djMlZ5YVdZN0lHWnZiblF0YzJsNlpUb2dNVFJ3ZURzZ2ZUd3ZjM1I1YkdVK0NpQWdJQ0E4Y21WamRDQjNhV1IwYUQwaU1UQXdKU0lnYUdWcFoyaDBQU0l4TURBbElpQm1hV3hzUFNKaWJHRmpheUlnTHo0S0lDQWdJRHgwWlhoMElIZzlJalV3SlNJZ2VUMGlOVEFsSWlCamJHRnpjejBpWW1GelpTSWdaRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlJbTFwWkdSc1pTSWdkR1Y0ZEMxaGJtTm9iM0k5SW0xcFpHUnNaU0krVDJabWMyTnlhWEIwUEM5MFpYaDBQZ284TDNOMlp6ND0iCiAgICAiYXR0cmlidXRlcyI6IFsKICAgICAgICAidmFsdWUiOiAiw4Fydm9yZSIsCnsKICAgICAgICAidHJhaXRfdHlwZSI6ICJQcmljZSIsIAogICAgICAidmFsdWUiOiAiMzAsMDAkIgp9CgpdCn0=");
>>>>>>> da9f0ca2355ecf509b56a5cbd7dee8d421e4e17c

    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);

    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();
    _idPublic.increment();
<<<<<<< HEAD
=======
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
=======
        discounts = _discounts;
        availablePerTrait = _availablePerTrait;
>>>>>>> f033b8c88bdf16a69622e6164e730ed2ffd95b1f
    }

    // A function our user will hit to get their NFT.
    function mintPublic() public {
        require(publicSupply > 0, "Depleted");
        require(_idPublic.current() <= 45, "Maximum NFT's already minted");

        uint256 random = uint256(
            keccak256(abi.encodePacked(block.difficulty, block.timestamp))
        );

        // Get the current tokenId, this starts at 0.
        uint256 newItemId = _tokenIds.current();

        uint256 discount = calculateDiscount(random);

        traits[newItemId] = discount;
        // Actually mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newItemId);

        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        // Increment the counter for when the next NFT is minted.
        _tokenIds.increment();
        _idPublic.increment();
    }
<<<<<<< HEAD
>>>>>>> da9f0ca2355ecf509b56a5cbd7dee8d421e4e17c
  }

  function mintInternal(adress[] _adresses, uint[] discount) public onlyOwner{
    uint256 newItemId = _tokenIds.current();
    
    require(_adress.length==discount.lenght,"Arrays size must be the same");
    require(_adress.length>0,"Array must be greater than 0");
    require(discount.length>0,"Array must be greater than 0");
    require(_idInside.current()<=105, "Maximum NFT's already minted");

    uint256 length = _adresses.length;

<<<<<<< HEAD
    for(uint256 i = 1; i < lenght; i++) {
      MintNew(_adress[i], newItemId, discount[i]);
  }

  // TEST FUNCTIONS
  function getCurrentId() public view returns(uint256){
      return _tokenIds.current();
=======
  //Override functions
  function _beforeTokenTransfer(address from, address to, uint256 amount) internal override(ERC721, ERC721Enumerable){
      super._beforeTokenTransfer(from,to,amount);
>>>>>>> da9f0ca2355ecf509b56a5cbd7dee8d421e4e17c
  }
=======

    function mintInternal(
        address[] calldata _addresses,
        uint256[] calldata _discounts
    ) external onlyOwner {
        require(
            _addresses.length == _discounts.length,
            "Arrays size must be the same"
        );
        require(_addresses.length > 0, "Array must be greater than 0");
        // require(_idInside.current()<=105, "Maximum NFT's already minted");

        uint256 length = _addresses.length;

        require(internalSupply >= length, "Depleted");
>>>>>>> f033b8c88bdf16a69622e6164e730ed2ffd95b1f

        for (uint256 i = 1; i < length; i++) {
            _mintWithDiscount(
                _addresses[i],
                _idInside.current() + totalPublicSupply,
                discounts[i]
            );
            _idInside.increment();
            internalSupply -= 1;
        }
    }

    function _mintWithDiscount(
        address _owner,
        uint256 _id,
        uint256 _discount
    ) internal {
        traits[_id] = _discount;
        _safeMint(_owner, _id);
    }

    function calculateDiscount(uint256 random) internal returns (uint256) {
        uint256 _random = random % publicSupply;
        // 10 -> 10% // 15 -> 20% // 15 -> 30% // 4 -> 50% // 1 -> 100%
        uint256 i = 0;
        while (i < availablePerTrait.length) {
            uint256 aux = availablePerTrait[i] - _random;
            if (aux > 0) {
                publicSupply -= 1;
                availablePerTrait[i] -= 1;
                return discounts[i];
            } else _random -= availablePerTrait[i];
        }
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