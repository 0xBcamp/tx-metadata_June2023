// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "solmate/utils/SSTORE2.sol";
import "../Constants.sol";
import "../interfaces/IMetadataHandler.sol";

/// @title Storage2
/// @author wiasliaw
/// @dev use SSTORE2 to store data onchain
contract Storage2 is IMetadataHandler {
    event Recorded(address indexed pointer);

    function canImplementInterfaceForAddress(
        bytes32 interfaceHash,
        address /* account */
    ) external pure returns (bytes32) {
        require(TXM_INTERFACE_HASH == interfaceHash);
        return ERC1820_ACCEPT_MAGIC;
    }

    function handle(bytes calldata metadata) external returns (bool success) {
        address pointer = SSTORE2.write(metadata);
        emit Recorded(pointer);
        success = true;
    }

    function read(address pointer) external view returns (bytes memory ret) {
        ret = SSTORE2.read(pointer);
    }
}
