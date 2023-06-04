require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKeys = process.env.PRIVATE_KEYS || ""
const infuraKey = process.env.INFURA_API_KEY || ""

/** @type import('hardhat/config').HardhatUserConfig */
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.6.7",
      },
      {
        version: "0.6.12",
      }
    ]
  },

  networks: {

    localhost: {
      url: "http://127.0.0.1:8545"

    },
    goerli: {
      
      url: `https://goerli.infura.io/v3/${infuraKey}`,
      accounts: privateKeys.split(","),
    }
  }
};
