// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {

    console.log("Inside ChangeOwner");
    console.log("tx.origin");
    console.log(tx.origin);
    console.log("Owner");
    console.log(owner);
    if (tx.origin != msg.sender) {

      console.log("Owner Changed");
      owner = _owner;
      console.log(owner);     
    }
  }
}