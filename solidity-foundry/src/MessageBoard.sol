// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageBoard {
    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    Message[] public messages;

    event NewMessage(address indexed sender, string content, uint256 timestamp);

    function postMessage(string calldata _content) public {
        require(bytes(_content).length > 0, "Message cannot be empty");
        messages.push(Message(msg.sender, _content, block.timestamp));
        emit NewMessage(msg.sender, _content, block.timestamp);
    }

    function getMessages() public view returns (Message[] memory) {
        return messages;
    }
}