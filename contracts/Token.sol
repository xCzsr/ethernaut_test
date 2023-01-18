// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "hardhat/console.sol";

contract Token {

  mapping(address => uint) balances;
  uint public totalSupply;

  constructor(uint _initialSupply) public {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint _value) public returns (bool) {
    
    require(balances[msg.sender] - _value >= 0);
    // console.log("Balance Require");
    // console.log(balances[msg.sender] - _value);

    balances[msg.sender] -= _value;
    
    // console.log("Balance 1");
    // console.log(balances[msg.sender]);

    balances[_to] += _value;

    // console.log("Balance 2");
    // console.log(balances[msg.sender]);

    return true;
  }

  function balanceOf(address _owner) public view returns (uint balance) {

    return balances[_owner];
  }
}