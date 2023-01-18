// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Delegate {

  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }

  function pwn() public {
    console.log("inside pmn");
    console.log("Owner Before");
    console.log(owner);
    console.log(msg.sender);
    owner = msg.sender;
    
    console.log("Owner after");
    console.log(owner);
  }
}