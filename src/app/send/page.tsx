"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { formatEther, parseEther } from "viem";
import { useBalance, useConnection, useSendTransaction, useWaitForTransactionReceipt, type BaseError } from "wagmi";

function Page() {
  const { isConnected, address } = useConnection();
  const { data: balance } = useBalance({ address });
  const { data: hash, isPending, sendTransaction, error } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const to = formData.get("address") as `0x${string}`;

    const value = formData.get("value") as string;

    sendTransaction({ to, value: parseEther(value) });
  }

  if (!isConnected) {
    return (
      <main className="flex min-h-screen flex-col p-4 md:p-8">
        <div className="mx-auto w-full max-w-2xl">
          <Link
            href="/"
            className="btn btn-ghost btn-sm text-base-content mb-4 cursor-pointer opacity-100 hover:opacity-80"
          >
            ← Back
          </Link>

          <ConnectButton />

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Wallet Not Connected</h2>

              <p>Please connect your wallet first to send transactions</p>

              <div className="card-actions mt-4 justify-center">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
            <h2 className="card-title mb-4 text-2xl">Send Transaction</h2>

            {balance && (
              <div className="stat bg-base-200 mb-4 rounded-lg">
                <div className="stat-title">Wallet Balance</div>
                <div className="stat-value text-lg">
                  {formatEther(balance.value)} {balance.symbol}
                </div>
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Recipient Address</span>
                </label>
                <input
                  name="address"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="0xA0Cf…251e"
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Amount (ETH)</span>
                </label>
                <input name="value" type="text" className="input input-bordered w-full" placeholder="0.05" required />
              </div>

              <div className="card-actions mt-6 justify-end">
                <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={isPending}>
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Confirming...
                    </>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </form>

            {hash && (
              <div className="alert alert-info mt-4">
                <span>Transaction Hash: {hash}</span>
              </div>
            )}

            {isConfirming && (
              <div className="alert alert-info mt-4">
                <span className="loading loading-spinner loading-sm"></span>
                <span>Waiting for confirmation...</span>
              </div>
            )}

            {isConfirmed && (
              <div className="alert alert-success mt-4">
                <span>✓ Transaction confirmed!</span>
              </div>
            )}

            {error && (
              <div className="alert alert-error mt-4">
                <span>Error: {(error as BaseError).shortMessage || error.message}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
