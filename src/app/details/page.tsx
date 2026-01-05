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
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            ← Back
          </Link>
          <ConnectButton />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">
            Wallet Details
          </h1>

          {status === "connected" ? (
            <div className="space-y-4">
              {/* Connection Status */}
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Connection Status
                </div>
                <div className="text-base font-medium capitalize">{status}</div>
              </div>

              {/* Address */}
              {address && (
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Wallet Address
                  </div>
                  <div className="text-base font-mono break-all">{address}</div>
                </div>
              )}

              {/* Balance */}
              {balance && (
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Balance
                  </div>
                  <div className="text-base font-medium">
                    {formatEther(balance.value)} {balance.symbol}
                  </div>
                </div>
              )}

              {/* Chain ID */}
              {chainId && (
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Chain ID
                  </div>
                  <div className="text-base font-medium">{chainId}</div>
                </div>
              )}

              {/* Chain Name */}
              {chain && (
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Network
                  </div>
                  <div className="text-base font-medium">{chain.name}</div>
                </div>
              )}

              {/* Gas Price */}
              {gasPrice && (
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Gas Price
                  </div>
                  <div className="text-base font-medium">
                    {formatEther(gasPrice)} {chain?.nativeCurrency?.symbol || "ETH"}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Please connect your wallet to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

