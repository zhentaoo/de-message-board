import React, { useState, useEffect } from "react";
import { getMessages, postMessage } from "./service/contract.js";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages();
      setMessages(msgs);
    };
    fetchMessages();
  }, []);

  const handlePostMessage = async () => {
    if (!newMessage) return;
    await postMessage(newMessage);
    setNewMessage("");
    const msgs = await getMessages();
    setMessages(msgs);
  };

  return (
    <div className="App">
      <h1>Decentralized Message Board</h1>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a message"
        />
        <button onClick={handlePostMessage}>Post Message</button>
      </div>
      <div>
        <h2>Messages</h2>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>
              <strong>{msg.sender}</strong>: {msg.content}
            </p>
            <small>{msg.timestamp.toString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;