// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "forge-std/Test.sol";
import "../lib/openzeppelin-contracts/contracts/utils/introspection/IERC1820Registry.sol";
import "../lib/multicall/src/interfaces/IMulticall3.sol";

import "../src/Constants.sol";
import "../src/TransactionMetadataEntry.sol";
import "../src/mocks/MockHandler.sol";
import "../src/mocks/MockCallee.sol";

contract TestTransactionMetadataEntry is Test {
    IERC1820Registry _erc1820register = IERC1820Registry(ADDR_ERC1820_REGISTRY);
    TransactionMetadataEntry _instance;
    MockHandler _implementer;
    MockCallee _callee;

    event MockRecord(bytes);

    // beforeEach
    function setUp() external {
        // fork goerli
        vm.createSelectFork("goerli");

        // setup contracts
        _instance = new TransactionMetadataEntry();
        _implementer = new MockHandler();
        _callee = new MockCallee();

        // register ERC1820 interface
        _erc1820register.setInterfaceImplementer(
            address(this),
            TXM_INTERFACE_HASH,
            address(_implementer)
        );

        // assert setup
        assertEq(
            _erc1820register.getInterfaceImplementer(
                address(this),
                TXM_INTERFACE_HASH
            ),
            address(_implementer)
        );
    }

    // bug according to https://github.com/foundry-rs/foundry/issues/476
    function testTxmExecute() external {
        IMulticall3.Call3Value[] memory txs = new IMulticall3.Call3Value[](1);
        txs[0] = IMulticall3.Call3Value({
            target: address(_callee),
            allowFailure: false,
            value: uint256(0),
            callData: abi.encodeCall(MockCallee.set, (33))
        });

        vm.expectEmit(true, true, true, true, address(_implementer));
        emit MockRecord(bytes("hello world"));
        _instance.txmExecuteWithValue(txs, bytes("hello world"));
        assertEq(_callee.get(), 33);
    }
}
