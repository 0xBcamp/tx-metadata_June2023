// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract MockCallee {
    uint256 private _value;

    event Updated(address indexed sender, uint256 value);

    event Received(address indexed sender, uint256 value);

    function set(uint256 value) external {
        _value = value;
        emit Updated(msg.sender, value);
    }

    function get() external view returns (uint256) {
        return _value;
    }

    fallback() external payable {
        emit Received(msg.sender, msg.value);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
