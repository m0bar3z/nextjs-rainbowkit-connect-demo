"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { formatEther } from "viem";
import { useBalance, useConnection, useGasPrice } from "wagmi";

export default function DetailsPage() {
  const { address, chain, chainId, status } = useConnection();
  const { data: balance } = useBalance({ address });
  const { data: gasPrice } = useGasPrice();

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Link href="/" className="btn btn-ghost z-10">
            ← Back
          </Link>

          <ConnectButton />
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4 text-2xl">Wallet Details</h2>

            {status === "connected" ? (
              <div className="space-y-4">
                <div className="stat bg-base-200 rounded-lg">
                  <div className="stat-title">Connection Status</div>
                  <div className="stat-value text-lg capitalize">{status}</div>
                </div>

                {address && (
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Wallet Address</div>
                    <div className="stat-value font-mono text-sm text-wrap break-all">{address}</div>
                  </div>
                )}

                {balance && (
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Balance</div>
                    <div className="stat-value text-lg">
                      {formatEther(balance.value)} {balance.symbol}
                    </div>
                  </div>
                )}

                {chainId && (
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Chain ID</div>
                    <div className="stat-value text-lg">{chainId}</div>
                  </div>
                )}

                {chain && (
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Network</div>
                    <div className="stat-value text-lg">{chain.name}</div>
                  </div>
                )}

                {gasPrice && (
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Gas Price</div>
                    <div className="stat-value text-lg">
                      {formatEther(gasPrice)} {chain?.nativeCurrency?.symbol || "ETH"}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="alert alert-warning">
                <span>Please connect your wallet to view details</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
