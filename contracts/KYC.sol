// contracts/KYC.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KYC is Ownable {
    // userData is a bitmap:
    //   0-29  placeholder
    //   30-31 user's permission: 0 no permission, 1 normal member, ...
    mapping(address => uint256) private userDatas;
    uint256 public usersSize;
    uint256 constant PERMISSION_MASK = 0x000000000000000000000000000000FF;

    constructor() {}

    // function getUserData(address user) external view returns (uint256) {
    //     return userDatas[user];
    // }

    function getUserPermission(address user) external view returns (uint256) {
        return userDatas[user] & PERMISSION_MASK;
    }

    function setUserPermisstion(address user, uint256 permission)
        public
        onlyOwner
    {
        require(permission <= 0xFF, "PERMISSION_TOO_LARGE");

        uint256 _userDataBefore = userDatas[user];
        uint256 _userDataAfter = (_userDataBefore & ~PERMISSION_MASK) |permission;
        
        if ((_userDataBefore & PERMISSION_MASK) == 0 && _userDataAfter > 0) {
            usersSize++;
        } else if (
            (_userDataBefore & PERMISSION_MASK) > 0 && _userDataAfter == 0
        ) {
            usersSize--;
        }
        userDatas[user] = _userDataAfter;
    }

    // function setUserData(address user, uint256 data) public onlyOwner {
    //     userDatas[user] = data;
    // }
}
