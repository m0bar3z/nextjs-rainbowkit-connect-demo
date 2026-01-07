"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { parseEther } from "viem";
import { useConnection, useSendTransaction, useWaitForTransactionReceipt, type BaseError } from "wagmi";

function Page() {
  const { address, isConnected, isConnecting } = useConnection();
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
      <div className="flex flex-col gap-4">
        <div>Please Connect To Your Wallet First!</div>

        <ConnectButton />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="mx-auto w-full max-w-2xl space-y-6">
         <Link
            href="/"
            className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            ← Back
          </Link>
        <form onSubmit={submit} className="flex flex-col items-center justify-center gap-2">
          <input
            name="address"
            className="rounded-xl bg-gray-200 p-3 text-gray-950"
            placeholder="0xA0Cf…251e"
            required
          />

          <input name="value" placeholder="0.05" className="rounded-xl bg-gray-200 p-3 text-gray-950" required />

          <button type="submit" className="btn btn-primary mt-8 rounded-xl" disabled={isPending}>
            {isPending ? "Confirming..." : "Send"}
          </button>

          {hash && <div>Transaction Hash: {hash}</div>}

          {isConfirming && <div>Waiting for confirmation...</div>}

          {isConfirmed && <div>Transaction confirmed.</div>}

          {error && <div>Error: {(error as BaseError).shortMessage || error.message}</div>}
        </form>
      </div>
    </main>
  );
}

export default Page;
