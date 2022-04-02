// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Lottery{

    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether);

        players.push(msg.sender);
    }

    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

}


// SOL GOTCHA 1
//NOTE : String itself is considered array of chars, so using below code is not accetable
// const color = ["red","green","yellow"];
// bcoz it will be considered as dynamic nested array, which ABI/JS/Web3 doesnt support


// SOL GOTCHA 2
// variable define as array in solidity doesnt create public function it does not int, string or any other data type declaration.
// Thats why it provide function with parameter which takes index and then return the value based on index
