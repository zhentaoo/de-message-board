// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MintToken} from "../src/Mint.sol";

contract DTransfer is Script {
    function run() public {
        vm.startBroadcast();

        new MintToken();

        vm.stopBroadcast();
    }
}
