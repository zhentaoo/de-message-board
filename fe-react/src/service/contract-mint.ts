import { ethers } from "ethers";
import MintABI from "../abi/Mint.json";

const contractAddress = '0x62dA2ff1A66d83b26cb1EA87fCf1028FFA4B221D';

let provider;
let signer;
let contract;

// 初始化 provider 和 contract
export const initialize = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);

  let accounts = await provider.listAccounts();

  if (accounts.length === 0) {
    // 如果之前没有连接，则请求连接
    await provider.send("eth_requestAccounts", []);

    accounts = await provider.listAccounts();
  }
  console.log("innintaalls");

  signer = provider.getSigner();

  contract = new ethers.Contract(contractAddress, MintABI, signer);
  return accounts;
};

export const mint = async (to: string, amount: string) => {
  try {
    const tx = await contract.mint(to, ethers.utils.parseEther(amount));
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Error during transfer:", error);
  }
};

export const airdrop = async (amount: string) => {
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
