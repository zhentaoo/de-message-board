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
    <div>
      {accounts.length > 0 ? (
        <div className="mb-20 text-[17px] text-orange-400 font-bold">
          Account: {accounts[0]}
        </div>
      ) : (
        <button onClick={connectWallet} color="black">
          Connect Wallet
        </button>
      )}

      <div>
        <div className="font-bold">Messages</div>
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
                <span className="font-normal">{msg.timestamp.toString()}</span>
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
  );
};

export default App;
