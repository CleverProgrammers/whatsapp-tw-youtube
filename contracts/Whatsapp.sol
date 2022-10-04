// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Whatsapp {
    struct Message {
        address user;
        string message;
        uint256 timestamp;
    }

    Message[] messages;
    uint256 totalMessages;
    mapping(address => uint256) public lastMessaged;

    event NewMessage(address indexed from, uint256 timestamp, string message);

    function sendMessage(string memory _message) public {
        require(
            lastMessaged[msg.sender] + 5 seconds < block.timestamp,
            "Wait 5 seconds before sending another message"
        );

        lastMessaged[msg.sender] = block.timestamp;
        totalMessages++;
        messages.push(Message(msg.sender, _message, block.timestamp));

        emit NewMessage(msg.sender, block.timestamp, _message);
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }

    function getTotalMessagesCount() public view returns (uint256) {
        return totalMessages;
    }
}
