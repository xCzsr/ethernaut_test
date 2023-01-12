const { ethers } = require('hardhat');
const { expect } = require("chai");

describe("Testing Telephone", ()=> {

    let deployer, hacker_account
    
    beforeEach(async()=>{

        const account = await ethers.getSigners()
      
        deployer = account[0]
        hacker_account = account[1]
      
        const tele_contract = await ethers.getContractFactory("contracts/Telephone.sol:Telephone", deployer);
        const teleH_contract = await ethers.getContractFactory("TelephoneHack", hacker_account);
        
        let tel = await tele_contract.deploy()
        await tel.deployed()
    
        console.log("Tele address: " , tel.address)
        let telH = await teleH_contract.deploy(tel.address)
        await telH.deployed()
        console.log("Tele Hack address: ", telH.address)
    

    });

    describe("Test Fallback", async ()=> {

        it("Test Withdraw", async() => {

            console.log("Testing Start")

            await fbc.becomeOwner()
 
            fbc.sucess_flag ? console.log("sucess_flag == True") : console.log("sucess_flag == False")
            
            console.log("Contribution %d", await fbc.getContribution())

        })


    })

})