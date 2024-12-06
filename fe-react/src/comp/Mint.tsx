import React, { useEffect, useState } from "react";
import {
  initialize,
  transfer,
  deposit,
  withdraw,
  getBalance,
} from "../service/contract-tx";

import { Button, Input, notification } from "antd";

const Mint = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balance, setBalance] = useState<string>("");
  const [transferTo, setTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  // 连接钱包并获取账户信息
  const connectWallet = async () => {
    try {
      const acc: string[] = await initialize();
      setAccounts(acc); // 更新账户
      fetchBalance(acc[0]); // 获取当前账户余额
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  // 获取余额
  const fetchBalance = async (address: string) => {
    try {
      const bal = await getBalance(address);
      setBalance(bal);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  // 转账功能
  const handleTransfer = async () => {
    try {
      if (transferTo && transferAmount) {
        await transfer(transferTo, transferAmount);
        fetchBalance(accounts[0]); // 更新余额
        setTransferTo(""); // 清空输入框
        setTransferAmount("");
      } else {
        notification.warning({
          message: "Please fill in the address and amount!",
        });
      }
    } catch (error) {
      console.error("Failed to transfer:", error);
    }
  };

  // 存款功能
  const handleDeposit = async () => {
    try {
      if (depositAmount) {
        await deposit(depositAmount);
        fetchBalance(accounts[0]); // 更新余额
        setDepositAmount(""); // 清空输入框
      } else {
        notification.warning({
          message: "Please enter deposit amount!",
        });
      }
    } catch (error) {
      console.error("Failed to deposit:", error);
    }
  };

  // 提款功能
  const handleWithdraw = async () => {
    try {
      if (withdrawAmount) {
        await withdraw(withdrawAmount);
        fetchBalance(accounts[0]); // 更新余额
        setWithdrawAmount(""); // 清空输入框
      } else {
        notification.warning({
          message: "Please enter withdraw amount!",
        });
      }
    } catch (error) {
      console.error("Failed to withdraw:", error);
    }
  };

  // 在组件加载时连接钱包
  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      {/* 钱包信息 */}
      <div className="mb-6">
        {accounts.length > 0 ? (
          <div>
            <p>
              Contract Address:{" "}
              <a
                href={`https://sepolia.etherscan.io/address/0x84B663A84268d8c16Bf84f881FC10b8605F89da2`}
                target="_blank"
                rel="noopener noreferrer"
              >
                0x84B663A84268d8c16Bf84f881FC10b8605F89da2
              </a>
            </p>
            <p>Contract Balance: {balance} ETH</p>
          </div>
        ) : (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
      </div>

      {/* 转账表单 */}
      <div className="mb-6">
        <h3 className="font-semibold mt-50">Transfer</h3>
        <Input
          placeholder="Recipient Address"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
          className="mb-4"
        />
        <Input
          placeholder="Amount (ETH)"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          className="mb-4"
        />
        <Button type="primary" onClick={handleTransfer}>
          Transfer
        </Button>
      </div>

      {/* 存款表单 */}
      <div className="mb-6">
        <h3 className="font-semibold mt-50">Deposit（存到合约）</h3>
        <Input
          placeholder="Amount to Deposit (ETH)"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          className="mb-4"
        />
        <Button type="primary" onClick={handleDeposit}>
          Deposit
        </Button>
      </div>

      {/* 提款表单 */}
      <div className="mb-6">
        <h3 className="font-semibold mt-50">Withdraw（提取到账户）</h3>
        <Input
          placeholder="Amount to Withdraw (ETH)"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="mb-4"
        />
        <Button type="primary" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default Mint;
