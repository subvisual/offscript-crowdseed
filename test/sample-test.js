const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Contract = await ethers.getContractFactory("offscriptNFT");
    const contract = await Contract.deploy("My wallet");
    await contract.deployed();

    for(let i=0; i < 45; i++){
      const mintTx = await contract.makeNFT();
      await mintTx.wait();
    } // duvidas
    
  });
});

/* 
  Simular pagamentos
  Randomness
  45 nfts - corresponde ao esperado. 
*/
