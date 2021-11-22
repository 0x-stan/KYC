import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { Signer, Contract, utils, BigNumber } from "ethers";
import chai from "chai";
import { solidity } from "ethereum-waffle";

chai.use(solidity);

const { expect } = chai;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("KYC Ownable", function () {
  let owner: Signer, other: Signer;
  let ownerAddress: string, otherAddress: string;
  let ownable: Contract;

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    otherAddress = await other.getAddress();
    const Ownable = await ethers.getContractFactory("KYC");
    ownable = await Ownable.deploy();
  });

  it("has an owner", async function () {
    expect(await ownable.owner()).to.equal(ownerAddress);
  });

  describe("transfer ownership", function () {
    it("changes owner after transfer", async function () {
      await expect(
        ownable.transferOwnership(otherAddress, {
          from: ownerAddress,
        })
      ).to.emit(ownable, 'OwnershipTransferred')

      expect(await ownable.owner()).to.equal(otherAddress);
    });

    it("prevents non-owners from transferring", async function () {
      await expect(
        ownable.connect(other).transferOwnership(otherAddress)
      ).to.revertedWith("Ownable: caller is not the owner");
    });

    it("guards ownership against stuck state", async function () {
      await expect(
        ownable.transferOwnership(ZERO_ADDRESS, { from: ownerAddress })
      ).to.revertedWith("Ownable: new owner is the zero address");
    });
  });

  describe("renounce ownership", function () {
    it("loses owner after renouncement", async function () {
      await expect(
        ownable.renounceOwnership({
          from: ownerAddress,
        })
      ).to.emit(ownable, 'OwnershipTransferred');

      expect(await ownable.owner()).to.equal(ZERO_ADDRESS);
    });

    it("prevents non-owners from renouncement", async function () {
      await expect(
        ownable.connect(other).renounceOwnership()
      ).to.revertedWith("Ownable: caller is not the owner");
    });
  });
});
