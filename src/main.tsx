import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { ConfigProvider } from "antd";
import App from "./App";
import { App as AntdApp } from 'antd';

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
createRoot(rootElement).render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "Poppins, sans-serif", // Set font family for Ant Design
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
    <AntdApp>
      <App />
      </AntdApp>
    </QueryClientProvider>
  </ConfigProvider>
);
