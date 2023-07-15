// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "forge-std/Script.sol";
import "../contract/TransactionMetadataEntry.sol";
import "../contract/mocks/MockHandler.sol";

contract Deployment is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        MockHandler handler = new MockHandler();
        TransactionMetadataEntry entry = new TransactionMetadataEntry();
        vm.stopBroadcast();
    }
}
