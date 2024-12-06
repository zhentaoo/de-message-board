// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Transaction} from "../src/Transaction.sol";

contract DTransfer is Script {
    function run() public {
        vm.startBroadcast();

        new Transaction();

        vm.stopBroadcast();
    }
}
