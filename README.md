# Ethernaut_test
Working through the ethernaut challange and documention as much as Possible

# Fallback

This exploit example highlights the improper use of Fallback Functions.

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
This exploit example highlights the improper use of a constructor.

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

# Coin Flip

This exploit example highlight the improper use of randomness.

Based on the `flip()` function pasted below, using the blocknumber and hash and factor used can help predict the coin flip.
           
    function flip(bool _guess) public returns (bool){
    uint256 blockValue = uint256(blockhash(block.number - 1));

    if (lastHash == blockValue) {
      revert();
    }

    lastHash = blockValue;
    uint256 coinFlip = blockValue / FACTOR;
    bool side = coinFlip == 1 ? true : false;

    if (side == _guess) {
      consecutiveWins++;
      return true;
    } else {
      consecutiveWins = 0;
      return false;
    }

the solution should be as follows.
1. call the `flip()` function  10 times 

To run my solution:
1. I used remix 

# TelePhone 

This exploit example highlight the improper use of tx.origin.

Based on the `ChangeOwner()` function it is clear that the the solution is to call this function with an address. Due to tx.origin and msg.sender not being the same thing. 

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
          owner = _owner;
        }
      }

The solution is call:
1. call the `changeOwner()` with the wallet address 

To run my solution: 
1. I used hardhat with the goerli test network.
`npx hardhat run scripts/4_deploy_Tele.js --network goerli`