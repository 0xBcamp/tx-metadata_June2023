// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "openzeppelin/utils/introspection/IERC1820Implementer.sol";

/// @title IMetadataHandler
/// @author wiasliaw
/// @dev interface to implement for metadata handler
interface IMetadataHandler is IERC1820Implementer {
    /// @dev Handlers are to trggier off-chain services, not to perform side effect here.
    /// @param metadata a parameter about metadata
    /// @return success boolean to indicate whether the call is success or not
    function handle(bytes calldata metadata) external returns (bool success);

    /// @inheritdoc IERC1820Implementer
    function canImplementInterfaceForAddress(
        bytes32 interfaceHash,
        address account
    ) external view override returns (bytes32);
}
