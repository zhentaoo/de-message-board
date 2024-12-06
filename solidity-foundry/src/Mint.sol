// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18;

    constructor() ERC20("ZhentaooToken", "ZTTK") Ownable(msg.sender) {
        uint256 initialSupply = 500_000 * 10 ** 18; // 初始供应量：500,000 个代币
        _mint(msg.sender, initialSupply); // 初始供应量分配给部署者
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    function airdrop(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyOwner {
        require(
            recipients.length == amounts.length,
            "Recipients and amounts length mismatch"
        );
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
        }
    }
}
