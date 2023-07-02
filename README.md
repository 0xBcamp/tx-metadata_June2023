# tx-metadata

## Motivation

Blockchain explorers, such as Etherscan, offer functionality to label addresses. However, when it comes to transactions, these explorers lack the capability for users to add metadata to their transactions.

## Architecture

![](./static/architecture.png)

1. Accounts, both EOA and Smart Contract, should register the hook information into ERC1820 registry.
2. After that, accounts can send transactions to `Executor`. The Executor handle the transactions through `Multicall` contract and handle metadata through `Metadata Handler`.
3. Metadata Handler is an interface of off-chain services, which will triggered by event emission and process metadata.
