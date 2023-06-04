pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import "hardhat/console.sol";

contract Reentrance {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    console.log("Donations");
    balances[_to] = balances[_to].add(msg.value);
    console.log(balances[_to]);

  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {


    if(balances[msg.sender] >= _amount) {
    console.log("Sending cahs");
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        console.log("Result true");
        _amount;
        console.log("amount");
        console.log(_amount);
      }
      console.log("Balance Before");
      console.log(balances[msg.sender]);

      balances[msg.sender] -= _amount;
      
      console.log("Balance After");
      console.log(balances[msg.sender]);
    }
  }

  receive() external payable {}
}