// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "../Constants.sol";
import "../interfaces/IMetadataHandler.sol";

contract MockHandler is IMetadataHandler {
    event MockRecord(bytes);

    function canImplementInterfaceForAddress(
        bytes32 interfaceHash,
        address /* account */
    ) external pure returns (bytes32) {
        require(TXM_INTERFACE_HASH == interfaceHash);
        return ERC1820_ACCEPT_MAGIC;
    }

    function handle(bytes calldata metadata) external returns (bool success) {
        emit MockRecord(metadata);
        success = true;
    }
}
