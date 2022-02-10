const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('OffscriptNFT');
  const [deployer] = await ethers.getSigners();
  const nftContract = await nftContractFactory.deploy(deployer.address);
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  let txn = await nftContract.makeNFT()
  // Wait for it to be mined.
  await txn.wait()
  let currentId = await nftContract.getCurrentId()
  console.log(currentId);
  let txn2 = await nftContract.makeNFT()
  await txn2.wait()
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();