import { ethers } from "ethers";
import MessageBoardABI from "../abi/MessageBoard.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

let provider;
let signer;
let contract;

// 初始化 provider 和 contract
export const initialize = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  if (!provider) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    debugger
    const accounts = await provider.listAccounts();
    
    if (accounts.length === 0) {
      // 如果没有连接，则请求连接
      await provider.send("eth_requestAccounts", []);
    }

    signer = provider.getSigner();

    contract = new ethers.Contract(contractAddress, MessageBoardABI, signer);
  }
};

// 获取链上留言
export const getMessages = async () => {
  if (!contract) {
    throw new Error("Contract is not initialized. Call initialize() first.");
  }

  const messages = await contract.getMessages();

  return messages.map((msg) => ({
    sender: msg.sender,
    content: msg.content,
    timestamp: new Date(msg.timestamp.toNumber() * 1000),
  }));
};

// 发布留言
export const postMessage = async (content) => {
  if (!contract) {
    throw new Error("Contract is not initialized. Call initialize() first.");
  }

  const tx = await contract.postMessage(content);
  await tx.wait();
};
