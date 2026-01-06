"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useConnection } from "wagmi";

export default function Home() {
  const { status, isConnecting, isReconnecting } = useConnection();

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-8">
        <div className="mb-4 space-y-2 text-center">
          <h1 className="text-3xl font-semibold">Web3 Wallet</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Connect your wallet to get started</p>
        </div>

        {!isConnecting && !isReconnecting ? <ConnectButton /> : null}

        {isConnecting && <div className="animate-pulse">Connecting...</div>}

        {isReconnecting && <div className="animate-pulse">Reconnecting...</div>}

        {status === "connected" && (
          <Link
            href="/details"
            className="cursor-pointer rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 dark:bg-gray-100 dark:text-gray-900"
          >
            View Wallet Details
          </Link>
        )}
      </div>
    </main>
  );
}
