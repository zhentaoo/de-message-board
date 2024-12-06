import { ethers } from "ethers";
import TxABI from "../abi/Transaction.json";

// 合约的 ABI 和地址（根据你实际的部署进行调整）
const contractAddress = "0x84B663A84268d8c16Bf84f881FC10b8605F89da2";

let contract: any;
let provider: ethers.providers.Web3Provider;
let signer: ethers.Signer;

export const initialize = async () => {
  // 连接到以太坊钱包
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    let accounts = await provider.listAccounts();
    
    if (accounts.length === 0) {
      // 如果之前没有连接，则请求连接
      await provider.send("eth_requestAccounts", []);
  
      accounts = await provider.listAccounts();
    }

    signer = provider.getSigner();

    contract = new ethers.Contract(contractAddress, TxABI, signer);
    
    return await accounts;
  } else {
    throw new Error("Ethereum wallet not found");
  }
};

export const transfer = async (to: string, amount: string) => {
  try {
    const tx = await contract.transfer(to, ethers.utils.parseEther(amount));
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Error during transfer:", error);
  }
};

export const deposit = async (amount: string) => {
  try {
    const tx = await contract.deposit({
      value: ethers.utils.parseEther(amount),
    });
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Error during deposit:", error);
  }
};

export const withdraw = async (amount: string) => {
  try {
    const tx = await contract.withdraw(ethers.utils.parseEther(amount));
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Error during withdrawal:", error);
  }
};

export const getBalance = async (address: string) => {
  try {
    const balance = await contract.getBalance(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("Error getting balance:", error);
  }
};
