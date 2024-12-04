import React, { useEffect, useState } from "react";
import { initialize, getMessages, postMessage } from "./service/contract.ts";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [accounts, setAccounts] = useState([]);
  
  const connectWallet = async () => {
    try {
      const acc = await initialize();

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
      await postMessage(content);
      fetchMessages(); // 更新列表
      setContent(""); // 清空输入框
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
        accounts[0]
      ) : (
        <button onClick={connectWallet} color="black">
          Connect Wallet
        </button>
      )}

      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <p>Sender: {msg.sender}</p>
              <p>Content: {msg.content}</p>
              <p>Timestamp: {msg.timestamp.toString()}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a message"
        />
        <button onClick={handlePostMessage}>Post Message</button>
      </div>
    </div>
  );
};

export default App;
