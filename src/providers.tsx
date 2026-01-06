"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";

import { injectedWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";

export const config = getDefaultConfig({
  appName: "Wallet Details Demo App",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base],
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "",
  walletConnectParameters: {
    metadata: {
      name: "Wallet Details Demo App",
      description: "Connect to my cool dapp",
      url: process.env.NEXT_PUBLIC_APP_URL || "",
      icons: [`${process.env.NEXT_PUBLIC_APP_URL}/favicon.ico`],
      redirect: {
        universal: process.env.NEXT_PUBLIC_APP_URL,
        native: process.env.NEXT_PUBLIC_APP_URL,
      },
    },
  },
  wallets: [
    {
      groupName: "Recommended",
      wallets: [injectedWallet, walletConnectWallet],
    },
  ],
  ssr: true,
});

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
