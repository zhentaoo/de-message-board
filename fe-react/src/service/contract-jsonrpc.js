import { ethers } from "ethers";
import MessageBoardABI from "../abi/MessageBoard.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

// 通过这种方式
const provider = new ethers.providers.JsonRpcProvider(
  import.meta.env.VITE_ALCHEMY_URL
);
const contract = new ethers.Contract(
  contractAddress,
  MessageBoardABI,
  provider
);

export const getMessages = async () => {
  const messages = await contract.getMessages();
  
  return messages.map((msg) => ({
    sender: msg.sender,
    content: msg.content,
    timestamp: new Date(msg.timestamp.toNumber() * 1000),
  }));
};

export const postMessage = async (content) => {
  const privateKey = import.meta.env.VITE_PRIVATE_KEY; // 为测试私钥
  console.log("privateKey:", privateKey);

  const wallet = new ethers.Wallet(privateKey, provider);
  console.log("wallet:", wallet);

  const contractWithSigner = contract.connect(wallet);

  const tx = await contractWithSigner.postMessage(content);
  await tx.wait();
};
