"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useConnection } from "wagmi";

export default function Home() {
  const { status, isConnecting, isReconnecting } = useConnection();

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body items-center gap-6 text-center">
          <h1 className="card-title text-3xl">Web3 Wallet</h1>
          <p className="text-base-content/60">Connect your wallet to get started</p>

          <div className="flex w-full justify-center">
            {!isConnecting && !isReconnecting ? <ConnectButton /> : null}
          </div>

          {isConnecting && (
            <div className="alert alert-info">
              <span className="loading loading-spinner loading-sm"></span>
              <span>Connecting...</span>
            </div>
          )}

          {isReconnecting && (
            <div className="alert alert-info">
              <span className="loading loading-spinner loading-sm"></span>
              <span>Reconnecting...</span>
            </div>
          )}

          <div className="card-actions w-full flex-col justify-center gap-3 sm:flex-row">
            {status === "connected" && (
              <>
                <Link href="/details" className="btn btn-primary w-full cursor-pointer sm:w-auto">
                  Wallet Details
                </Link>

                <Link href="/send" className="btn btn-outline w-full cursor-pointer sm:w-auto">
                  Send Transaction
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
