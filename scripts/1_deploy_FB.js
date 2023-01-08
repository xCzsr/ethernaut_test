
const { ethers } = require("hardhat");


async function main() {

  let deployer, hacker_account
  // step one step contract to deploy
  const account = await ethers.getSigners()

  deployer = account[0]
  hacker_account = account[1]

  const fb_contract = await ethers.getContractFactory("contracts/Fallback.sol:Fallback", deployer);
  const fbc_contract = await ethers.getContractFactory("FallbackHack", hacker_account);


  console.log("Accounts Fetched:\n", account[0].address , account[1].address);

  //  depoly contact 
  const fb = await fb_contract.deploy()
  await fb.deployed()
  console.log("Fallback address: " , fb.address)

  const fbc = await fbc_contract.deploy()
  await fbc.deployed()
  console.log("FBC address: " , fbc.address)

}

main()
.then(() => process.exit(0))
.catch((error)=> {
  console.error(error);
  process.exit(1);
});