import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider, theme } from "antd";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: {
          // Seed Token，影响范围大
          // colorPrimary: "#00b96b",
          // borderRadius: 2,

          // 派生变量，影响范围小
          // colorBgContainer: "#f6ffed",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
