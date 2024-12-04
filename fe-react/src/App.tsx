import React, { useEffect, useState } from "react";
import { initialize, getMessages, postMessage } from "./service/contract.ts";
import { Button, Input, notification } from "antd";
import "./App.css";

const { TextArea } = Input;

const App = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [accounts, setAccounts] = useState<string[]>([]);

  const connectWallet = async () => {
    try {
      const acc: string[] = await initialize();
      setAccounts(acc); // 只有当账户不同才更新状态

      fetchMessages();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const msgs = await getMessages();
      setMessages(msgs);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handlePostMessage = async () => {
    try {
      if (content) {
        await postMessage(content);
        fetchMessages(); // 更新列表
        setContent(""); // 清空输入框
      } else {
        notification.warning({
          message: "content not null!",
        });
      }
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="flex gap-50 mt-100 m-auto w-600 justify-between">
      <div className="fixed top-10 right-30">
        {accounts.length > 0 ? (
          <div>
            Current Account:
            <a
              href={`https://sepolia.etherscan.io/address/${accounts[0]}`}
              target="_blank"
            >
              {accounts[0]}
            </a>
          </div>
        ) : (
          <button onClick={connectWallet} color="black">
            Connect Wallet
          </button>
        )}
      </div>

      <div>
        <div className="mb-20 text-[17px] text-orange-400 font-bold">
          Messages Board
        </div>

        <div>
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className="mb-20">
                <p className="font-semibold">
                  Sender: <span className="font-normal">{msg.sender}</span>
                </p>
                <p className="font-semibold">
                  Content: <span className="font-normal">{msg.content}</span>
                </p>
                <p className="font-semibold">
                  Timestamp:
                  <span className="font-normal">
                    {msg.timestamp.toString()}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <TextArea
            className="mb-10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a message"
          />
          <Button onClick={handlePostMessage}>Post Message</Button>
        </div>
      </div>

      <div>
        <div className="mb-20 text-[17px] text-orange-400 font-bold">Tips</div>

        <a
          target="_blank"
          href=" https://sepolia.etherscan.io/address/0xE9A70C9e3502a98a47d37Bb8E90751AB12ece8e7#code"
        >
          Contract Address
        </a>
      </div>
    </div>
  );
};

export default App;
