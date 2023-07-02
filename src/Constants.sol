// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/// @dev ERC1820 magic value
bytes32 constant ERC1820_ACCEPT_MAGIC = keccak256("ERC1820_ACCEPT_MAGIC");

/// @dev Use as interfaceHash for ERC1820
bytes32 constant TXM_INTERFACE_HASH = keccak256("tx-metadata::handle");

/// @dev ERC1820 Registry is deployed to all chain with the same address
address constant ADDR_ERC1820_REGISTRY = 0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24;

/// @dev Multicall3 is deployed to all chain with the same address
address constant ADDR_MULTICALL3 = 0xcA11bde05977b3631167028862bE2a173976CA11;
