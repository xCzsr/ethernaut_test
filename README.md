# Ethernaut_test
Working through the ethernaut challange and documention as much as Possible

# Fallback

This is exploit example highlights the improper use of Fallback Functions.

the solution to this problem is quiet simple.

Based on the fallback function pasted below, the sender can become the contract owner. If the sender calls the fallback function with any amount of ether and having any amount of contriubution associated to the sender address. 

`
receive() external payable {
    require(msg.value > 0 && contributions[msg.sender] > 0);
    owner = msg.sender;
  }
`

So the solution should be as follows.
1. Send a maximum of 0.001 ether to the `contribute()` function 
2. Send any small amount of ether to the fallback function
3. Call the `recieve()`

To run my solution:

Terminal #1 
`$ npx hardhat node`

Terminal #2
`$ npx hardhat run scripts/1_deploy_FB.js --network localhost`
`$ npx hardhat run scripts/2_becomeOwner_FB.js --network localhost`

# FallOut 
This is exploit example highlights the improper use of a constructor.

the solution to this problem is quiet simple.

Based on the constructor function pasted below, the sender can become the contract owner. If the sender calls the `Fal1out()` function with no amount of ether.

`function Fal1out() public payable {
  owner = payable(msg.sender);
  allocations[owner] = msg.value;
  }
  `

the solution should be as follows.
1. call the `Fal1out()` function and send it 0 ether

To run my solution:

Terminal #1 
`$ npx hardhat node`

Terminal #2
`$ npx hardhat run scripts/2_deploy_FO.js --network localhost`
