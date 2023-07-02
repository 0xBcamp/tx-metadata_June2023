// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "openzeppelin/utils/introspection/IERC1820Implementer.sol";

interface IMetadataHandler is IERC1820Implementer {
    /// @dev Hooks are to trggier off-chain services, not to perform side effect here.
    /// @param metadata a parameter about metadata
    /// @return success boolean to indicate whether the call is success or not
    function handle(
        bytes calldata metadata
    ) external returns (bool success);
}
