import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@openzeppelin/hardhat-upgrades";
import dotenv from "dotenv";
import { GAS_PRICE, ONE_ETH } from "./utils/constants";

dotenv.config();

function getAccounts(ifHardhatNetwork = false) {
  const privates = [
    process.env.PRIVATE_KEY_0 as string,
    process.env.PRIVATE_KEY_1 as string,
    process.env.PRIVATE_KEY_2 as string,
  ];
  if (ifHardhatNetwork) {
    return privates.map((_p) => {
      return {
        privateKey: _p,
        balance: ONE_ETH.mul(100).toString(),
      };
    });
  } else {
    return privates;
  }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: "0.8.7",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: getAccounts(),
    },
    hardhat: {
      gasPrice: GAS_PRICE.toNumber(), //  to calc gasUsed need a fixed value.
      accounts: getAccounts(true),
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/" + process.env.INFURA_ID, // <---- YOUR INFURA ID! (or it won't work)
      accounts: getAccounts(),
    },
    kovan: {
      url: "https://kovan.infura.io/v3/" + process.env.INFURA_ID, // <---- YOUR INFURA ID! (or it won't work)
      accounts: getAccounts(),
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/" + process.env.INFURA_ID, // <---- YOUR INFURA ID! (or it won't work)
      accounts: getAccounts(),
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/" + process.env.INFURA_ID, // <---- YOUR INFURA ID! (or it won't work)
      accounts: getAccounts(),
    },
    goerli: {
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_ID, // <---- YOUR INFURA ID! (or it won't work)
      accounts: getAccounts(),
    },
    xdai: {
      url: "https://rpc.xdaichain.com/",
      // gasPrice: GAS_PRICE.toNumber(),
      accounts: getAccounts(),
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com/",
      // gasPrice: GAS_PRICE.toNumber(),
      accounts: getAccounts(),
    },
    matic_mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/" + process.env.INFURA_ID,
      gasPrice: GAS_PRICE.toNumber(),
      accounts: getAccounts(),
    },
  },
};
