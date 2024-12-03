import { ethers } from "ethers";
import MessageBoardABI from "../abi/MessageBoard.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_ALCHEMY_URL
);
const contract = new ethers.Contract(
  contractAddress,
  MessageBoardABI,
  provider
);

export const getMessages = async () => {
  const messages = await contract.getMessages();
  debugger
  return messages.map((msg) => ({
    sender: msg.sender,
    content: msg.content,
    timestamp: new Date(msg.timestamp.toNumber() * 1000),
  }));
};

export const postMessage = async (content) => {
  debugger
  const privateKey = process.env.REACT_APP_PRIVATE_KEY; // 为测试私钥
  console.log("privateKey:", privateKey);
  console.log('Environment Variables:', process.env);


  const wallet = new ethers.Wallet(privateKey, provider);
  console.log("wallet:", wallet);

  const contractWithSigner = contract.connect(wallet);

  const tx = await contractWithSigner.postMessage(content);
  await tx.wait();
};
