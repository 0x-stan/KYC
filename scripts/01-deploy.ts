import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import { ethers, upgrades } from "hardhat";
import { Signer, Contract, utils, BigNumber } from "ethers";
import * as fs from "fs";

async function main() {
  const KYC = await ethers.getContractFactory("KYC");
  const instance: Contract = await upgrades.deployProxy(KYC);
  await instance.deployed();
  console.log("KYC deployed to:", instance.address);
  const deployData = { KYC_address: instance.address };
  fs.writeFileSync("./deployment.json", JSON.stringify(deployData), { flag: 'w+' })
}

main();
