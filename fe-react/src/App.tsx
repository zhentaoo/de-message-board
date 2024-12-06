import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

import MessageBoard from "./comp/MessageBoard.tsx";
import TX from "./comp/TX.tsx";
import Mint from "./comp/Mint.tsx";

import { initialize } from "./service/contract.ts";

import "./App.css";

const App = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("message-board");

  const connectWallet = async () => {
    try {
      const acc: string[] = await initialize();
      setAccounts(acc);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  // 根据 URL 设置当前激活的 Tab
  const getTabFromUrl = () => {
    const path = window.location.pathname.replace("/", "");
    return path || "message-board"; // 如果没有路径，默认返回 "message-board"
  };

  useEffect(() => {
    connectWallet();

    // 设置初始 Tab
    setActiveTab(getTabFromUrl());

    // 监听浏览器返回事件，保证 URL 改变时同步 Tab 状态
    const handlePopState = () => {
      setActiveTab(getTabFromUrl());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Tab 切换时触发
  const handleTabChange = (key: string) => {
    setActiveTab(key); // 更新激活的 Tab
    window.history.pushState(null, "", `/${key}`); // 更新 URL
  };

  return (
    <div>
      {/* 连接钱包显示 */}
      <div className="fixed top-10 right-30">
        {accounts.length > 0 ? (
          <div>
            Current Account:
            <a
              href={`https://sepolia.etherscan.io/address/${accounts[0]}`}
              target="_blank"
              rel="noopener noreferrer"
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

      {/* Tabs 控件 */}
      <Tabs
        className=" w-700 m-auto mt-50"
        activeKey={activeTab} // 当前激活的 Tab
        onChange={handleTabChange} // Tab 切换时处理
        items={[
          {
            key: "message-board",
            label: "Message Board",
            children: <MessageBoard />,
          },
          { key: "transfer", label: "Transfer", children: <TX /> },
          { key: "mint", label: "Mint", children: <Mint /> },
        ]}
      />
    </div>
  );
};

export default App;
