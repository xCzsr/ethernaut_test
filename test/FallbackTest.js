const { ethers } = require('hardhat');
const { expect } = require("chai");

describe("Testing Fallback Funtion", ()=> {

    let token, accounts, deployer, reciever, fallback_contract, fallback_hacker, fb, fbc
    
    beforeEach(async()=>{

        accounts = await ethers.getSigners();

        deployer = accounts[0]
        hacker = accounts[1]

        const fallback_contract = await ethers.getContractFactory("contracts/Fallback.sol:Fallback", deployer)
        fb = await fallback_contract.deploy()

        console.log(fb.address)
    
        const fallback_hacker = await ethers.getContractFactory("FallbackHack")
        fbc = await fallback_hacker.deploy(fb.address)

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