const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  let txHash, txReceipt;

  const Deyplay = await hre.ethers.getContractFactory("Deyplay");
  const deyplay = await Deyplay.deploy();
  await deyplay.deployed();

  txHash = deyplay.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let deyplayAddress = txReceipt.contractAddress;

  console.log("Deyplay contract address", deyplayAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });