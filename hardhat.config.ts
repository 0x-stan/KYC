import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-web3';
import '@openzeppelin/hardhat-upgrades';
import dotenv from 'dotenv';
import { GAS_PRICE, ONE_ETH } from './utils/constants'

dotenv.config();

function getAccounts() {
  const privates = [
    (process.env.PRIVATE_KEY_0 as string),
    (process.env.PRIVATE_KEY_1 as string),
    (process.env.PRIVATE_KEY_2 as string),
  ]
  return privates.map(_p => {
    return {
      privateKey: _p,
      balance: ONE_ETH.mul(100).toString()
    }
  })
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
// console.log((process.env[`${TEST_ACCOUNTS_PRIVATES}`] as string).split(','))

export default {
  solidity: '0.8.7',
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  networks: {
    hardhat: {
      // gasPrice: GAS_PRICE.toNumber(),   //  to calc gasUsed need a fixed value.
      accounts: getAccounts()
    },
  },
};
