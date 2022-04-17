// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CompaignFactory{
    address[] public deployedCompaign;

    function createCompaign(uint minimum) public {
        Compaign compaign = new Compaign(minimum, msg.sender);
        deployedCompaign.push(address(compaign));

    }

    function getDeployedCompaign() public view returns (address[] memory){
        return deployedCompaign;
    }
}


contract Compaign{

    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalsCount;
        mapping(address => bool) approvals;
    }

    mapping(uint => Request) public requests;

    uint numRequests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator){
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        //SOL GOTCHA String in parameters will always be marked with memory
        Request storage r = requests[numRequests++];
                r.description = description;
                r.value = value;
                r.recipient = recipient;
                r.complete = false;
                r.approvalsCount = 0;

    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender]=true;
        request.approvalsCount++;

    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalsCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

}
