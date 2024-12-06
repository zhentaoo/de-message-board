import React, { useState } from "react";
import { ethers } from "ethers";
import MintABI from "../abi/Mint.json";
import { Button } from "antd";

// 1. 合约 ABI 和地址
const contractABI = MintABI;
const contractAddress = "0x62dA2ff1A66d83b26cb1EA87fCf1028FFA4B221D"; // 合约地址

const MintToken: React.FC = () => {
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [mintAmount, setMintAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMint = async () => {
    if (!window.ethereum) {
      alert("请安装 MetaMask 或其他以太坊钱包！");
      return;
    }

    try {
      // 2. 初始化以太坊提供者和签名者
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      // 3. 创建合约实例
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // 4. 调用 mint 方法
      setIsLoading(true);

      const tx = await contract.mint(
        recipientAddress,
        ethers.utils.parseUnits(mintAmount, 18)
      ); // 使用18位小数

      await tx.wait(); // 等待交易被矿工打包

      alert("Mint成功！");

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("交易失败！");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Mint Token</h1>
      <div>
        <label>
          收件地址:
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Recipient Address"
          />
        </label>
      </div>
      <div>
        <label>
          铸造数量:
          <input
            type="text"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
            placeholder="Amount"
          />
        </label>
      </div>
      <Button onClick={handleMint} disabled={isLoading}>
        {isLoading ? "Processing..." : "Mint Tokens"}
      </Button>
    </div>
  );
};

export default MintToken;
