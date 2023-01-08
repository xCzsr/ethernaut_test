// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Fallback {

  mapping(address => uint) public contributions;
  address public owner;

  constructor() {
    console.log("Owner");
    owner = msg.sender;
    console.log(owner);

    contributions[msg.sender] = 5 * (1 ether);
  }

  modifier onlyOwner {
        require(
            msg.sender == owner,
            "caller is not the owner"
        );
        _;
    }

  function contribute() public payable {

    console.log("Money coming");
    console.log(msg.value);
    
    require(msg.value < 0.001 ether, "Need more ETH");
    contributions[msg.sender] += msg.value;
    console.log("Inside contribute");
    console.log("Contribution Sender");
    console.log(contributions[msg.sender]); 
    console.log("Contribution Owner");
    console.log(contributions[owner]);  
    
    if(contributions[msg.sender] > contributions[owner]) {
      owner = msg.sender;
    }

  }

  function getContribution() public view returns (uint) {
    console.log("Inside getContribution");
    console.log(contributions[msg.sender]);
    console.log("Msg Sender");
    console.log(msg.sender);
    console.log(owner);
    return contributions[msg.sender];
  }

  function withdraw() public onlyOwner {
    console.log("Inside withdraw");
    console.log("Owner");
    console.log(owner);
    console.log("Adress Balance");
    console.log(address(this).balance);
  
    payable(owner).transfer(address(this).balance);
    console.log("Done withdraw");
  }

  receive() external payable {
    require(msg.value > 0 && contributions[msg.sender] > 0);
    console.log("Inside Recieve");
    owner = msg.sender;
  }
  
}