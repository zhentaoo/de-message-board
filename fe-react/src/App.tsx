import React, { useEffect, useState } from "react";

import { Tabs } from "antd";
import MessageBoard from "./comp/MessageBoard.tsx";
import TX from "./comp/TX.tsx";

import { initialize } from "./service/contract.ts";

import "./App.css";

const App = () => {
  const [accounts, setAccounts] = useState<string[]>([]);

  const connectWallet = async () => {
    try {
      const acc: string[] = await initialize();

      setAccounts(acc); // 只有当账户不同才更新状态
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
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

      <Tabs
        className=" w-700 m-auto mt-50"
        defaultActiveKey="1"
        items={[
          { key: "1", label: "Message Board", children: <MessageBoard /> },
          { key: "2", label: "Transfer", children: <TX /> },
          // { key: "3", label: "Depositwithdraw", children: Depositwithdraw },
        ]}
      />
    </div>
  );
};

export default App;
