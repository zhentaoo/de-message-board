// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transaction {
    mapping(address => uint256) private balances;

    event Deposit(address indexed sender, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Withdraw(address indexed recipient, uint256 amount);

    // 转账功能：从调用者的余额中转账到另一个地址
    function transfer(address payable _to, uint256 _amount) public {
        require(_to != address(0), "Cannot transfer to zero address");
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        balances[msg.sender] -= _amount;
        balances[_to] += _amount;

        emit Transfer(msg.sender, _to, _amount);
    }

    // 存款功能：将以太币存入合约并更新用户余额
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // 查询余额
    function getBalance(address _account) public view returns (uint256) {
        return balances[_account];
    }

    // 提款功能：从合约中提取自己的余额
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);

        emit Withdraw(msg.sender, _amount);
    }

    // 接收以太币的特殊函数（可选）
    receive() external payable {
        deposit(); // 自动调用存款功能
    }
}
