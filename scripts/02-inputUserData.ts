import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import { ethers, upgrades } from "hardhat";
import { Signer, Contract, utils, BigNumber } from "ethers";
import * as fs from "fs";

// import {
//   abi as KYCabi,
//   bytecode as KYCbytecode,
// } from "../artifacts/contracts/KYC.sol/KYC.json";

function getDeployMent() {
  const data: any = fs.readFileSync(
    "./deployment.json"
  ) as unknown;
  return JSON.parse(data).KYC_address;
}

// members address list
const memberList = [
  //...
]

async function main() {
  let [owner] = await ethers.getSigners();

  const KYC = await ethers.getContractFactory("KYC");
  const { interface: abi, bytecode} = KYC;

  const instance = new ethers.ContractFactory(abi, bytecode, owner);
  const instanceWithSigner = instance.attach(getDeployMent()).connect(owner);
  // console.log(await instanceWithSigner.owner());
  console.log('usersSize before input:', await instanceWithSigner.usersSize());

  for (let i = 0; i < memberList.length; i++) {
    await instanceWithSigner.setUserPermisstion(memberList[i], 1);
  }

  console.log('usersSize after input:', await instanceWithSigner.usersSize());

}

main();
