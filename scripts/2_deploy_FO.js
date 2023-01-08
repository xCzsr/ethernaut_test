
const { ethers } = require("hardhat");


async function main() {

  let deployer, hacker_account
  // step one step contract to deploy
  const account = await ethers.getSigners()

  deployer = account[0]
  hacker_account = account[1]

  const fo_contract = await ethers.getContractFactory("contracts/Fallout.sol:Fallout", deployer);
  const foh_contract = await ethers.getContractFactory("FalloutHack", hacker_account);


  console.log("Accounts Fetched:\n", account[0].address , account[1].address);

  //  depoly contact 
  const fo = await fo_contract.deploy()
  await fo.deployed()
  console.log("Fallout address: " , fo.address)

  const foh = await foh_contract.deploy(`${fo.address}`)
  await foh.deployed()
  console.log("FBC address: " , foh.address)

  await foh.connect(hacker_account).becomeOwner()

}

main()
.then(() => process.exit(0))
.catch((error)=> {
  console.error(error);
  process.exit(1);
});