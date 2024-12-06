// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintAndDistributeToken is ERC20, Ownable {
    // 最大供应量
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10**18; // 100万代币，支持18位小数

    constructor() ERC20("DemoToken", "DMT") {}

    /**
     * @dev 铸造代币
     * 只有合约拥有者可以调用
     * @param to 接收代币的地址
     * @param amount 铸造的代币数量
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    /**
     * @dev 批量发行代币
     * 只有合约拥有者可以调用
     * @param recipients 接收代币的地址数组
     * @param amounts 每个地址接收的代币数量数组
     */
    function distribute(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Recipients and amounts length mismatch");

        for (uint256 i = 0; i < recipients.length; i++) {
            require(totalSupply() + amounts[i] <= MAX_SUPPLY, "Exceeds max supply");
            _mint(recipients[i], amounts[i]);
        }
    }
}
