import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import { ethers, upgrades } from "hardhat";
import { Signer, Contract, utils, BigNumber } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";

chai.use(solidity);

const { expect } = chai;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("KYC userData", function () {
  let owner: Signer, other: Signer, other2: Signer;
  let ownerAddress: string, otherAddress: string, otherAddress2: string;
  let instance: Contract;

  beforeEach(async function () {
    [owner, other, other2] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    otherAddress = await other.getAddress();
    otherAddress2 = await other2.getAddress();

    // Deploying
    const KYC = await ethers.getContractFactory("KYC");
    instance = await upgrades.deployProxy(KYC);
    await instance.deployed();

  });

  describe("getUserPermission()", function () {
    it("return 0 before admin set it", async function () {
      expect(await instance.getUserPermission(otherAddress)).to.equals(0);
    });

    it("return value after admin set permission", async function () {
      await instance.setUserPermisstion(otherAddress, 1);
      expect(await instance.getUserPermission(otherAddress)).to.equals(1);

      await instance.setUserPermisstion(otherAddress, 2);
      expect(await instance.getUserPermission(otherAddress)).to.equals(2);
    });
  });

  describe("usersSize()", function () {
    it("return 0 before admin setUser", async function () {
      expect(await instance.usersSize()).to.equals(0);
    });

    it("return right user's num when userData changing", async function () {
      await instance.setUserPermisstion(otherAddress, 1);
      expect(await instance.usersSize()).to.equals(1);

      await instance.setUserPermisstion(otherAddress2, 1);
      expect(await instance.usersSize()).to.equals(2);

      await instance.setUserPermisstion(otherAddress2, 0);
      expect(await instance.usersSize()).to.equals(1);

      await instance.setUserPermisstion(otherAddress, 0);
      expect(await instance.usersSize()).to.equals(0);
    });
  });

  describe("setUserPermission()", function () {
    it("revert with PERMISSION_TOO_LARGE when set permission > 0xFF", async function () {
      await expect(
        instance.setUserPermisstion(otherAddress, Number("0x01FF"))
      ).to.revertedWith("PERMISSION_TOO_LARGE");
    });
  });
});
