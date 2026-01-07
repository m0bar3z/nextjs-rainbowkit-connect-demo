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
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            ← Back
          </Link>
          <ConnectButton />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="mb-6 text-2xl font-semibold md:text-3xl">Wallet Details</h1>

          {status === "connected" ? (
            <div className="space-y-4">
              {/* Connection Status */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Connection Status</div>
                <div className="text-base font-medium capitalize">{status}</div>
              </div>

              {/* Address */}
              {address && (
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Wallet Address</div>
                  <div className="font-mono text-base break-all">{address}</div>
                </div>
              )}

              {/* Balance */}
              {balance && (
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Balance</div>
                  <div className="text-base font-medium">
                    {formatEther(balance.value)} {balance.symbol}
                  </div>
                </div>
              )}

              {/* Chain ID */}
              {chainId && (
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Chain ID</div>
                  <div className="text-base font-medium">{chainId}</div>
                </div>
              )}

              {/* Chain Name */}
              {chain && (
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Network</div>
                  <div className="text-base font-medium">{chain.name}</div>
                </div>
              )}

              {/* Gas Price */}
              {gasPrice && (
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Gas Price</div>
                  <div className="text-base font-medium">
                    {formatEther(gasPrice)} {chain?.nativeCurrency?.symbol || "ETH"}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
              <p className="text-gray-500 dark:text-gray-400">Please connect your wallet to view details</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
