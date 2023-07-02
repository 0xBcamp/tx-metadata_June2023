// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "multicall/interfaces/IMulticall3.sol";
import "openzeppelin/utils/introspection/IERC1820Registry.sol";
import {IMetadataHandler} from "./interfaces/IMetadataHandler.sol";
import {TXM_INTERFACE_HASH, ADDR_ERC1820_REGISTRY, ADDR_MULTICALL3} from "./Constants.sol";

/// @title Transaction Metadata Entry
/// @author @wiasliaw
/// @notice an entry contract for tx-metadata
contract TransactionMetadataEntry {
    IERC1820Registry public constant ERC1820_REGISTRY =
        IERC1820Registry(ADDR_ERC1820_REGISTRY);

    IMulticall3 public constant MULTICALL3 = IMulticall3(ADDR_MULTICALL3);

    function txmExecute(
        IMulticall3.Call3[] calldata _txs,
        bytes calldata _metadata
    ) external payable returns (IMulticall3.Result[] memory ret) {
        // check hook is registed
        address implementer = ERC1820_REGISTRY.getInterfaceImplementer(
            msg.sender,
            TXM_INTERFACE_HASH
        );
        require(implementer != address(0), "TXM: not regist the hook");
        bool success = IMetadataHandler(implementer).handle(_metadata);
        require(success, "TXM: trigger call faild");

        // execute transactions
        ret = MULTICALL3.aggregate3(_txs);
    }

    function txmExecuteWithValue(
        IMulticall3.Call3Value[] calldata _txs,
        bytes calldata _metadata
    ) external payable returns (IMulticall3.Result[] memory ret) {
        // check hook is registed
        address implementer = ERC1820_REGISTRY.getInterfaceImplementer(
            msg.sender,
            TXM_INTERFACE_HASH
        );
        require(implementer != address(0), "TXM: not regist the hook");
        bool success = IMetadataHandler(implementer).handle(_metadata);
        require(success, "TXM: trigger call faild");

        // execute transactions
        ret = MULTICALL3.aggregate3Value(_txs);
    }
}
