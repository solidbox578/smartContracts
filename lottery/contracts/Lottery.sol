// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Lottery{

    address public manager;
    address payable[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether);

        players.push(payable(msg.sender));
    }

    function random() private view returns(uint){
        // Here keccak256 is same as sha256 but takes input as abi encodePacked
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }


    function pickWinner() public managerRestricted {
        uint index = random() % players.length;
        // casting players[index] to payable address
        players[index].transfer(address(this).balance);
        // initialise palyers with empty address array with initial size of 0
        players = new address payable[](0);
    }

    // Only manager would be able to see the list of players enter into the lottery contest
    function getPlayersList() public view managerRestricted returns(address payable[] memory){
      return players;
    }

    // modifier helps to reuse the lines of code
    modifier managerRestricted(){
      require(msg.sender == manager);
      _;
    }


}


// SOL GOTCHA 1
//NOTE : String itself is considered array of chars, so using below code is not accetable
// const color = ["red","green","yellow"];
// bcoz it will be considered as dynamic nested array, which ABI/JS/Web3 doesnt support


// SOL GOTCHA 2
// variable define as array in solidity doesnt create public function it does not int, string or any other data type declaration.
// Thats why it provide function with parameter which takes index and then return the value based on index


// SOL GOTCHA3
// _ in modifier just replace with all codes available from where it has been used
