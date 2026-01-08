"use client";

import { useEffect, useState } from "react";
import TokenBadge from "./TokenBadge";

export type Token = {
  id: string;
  img: string;
  label: string;
  percent: string;
  size?: number;
  left?: number;
  top?: number;
  rotate?: number;
  blur?: number;
  floatDuration?: number;
};

const SHARED_RANGES = {
  sizeRange: [56, 92] as [number, number],
  rotateRange: [-20, 20] as [number, number],
  blurRange: [6, 12] as [number, number],
  floatDurationRange: [3, 8] as [number, number],
};

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randFloat = (min: number, max: number, decimals = 1) =>
  Number((Math.random() * (max - min) + min).toFixed(decimals));

const SAMPLE_TOKENS: Token[] = [
  {
    id: "crv",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png",
    label: "CRV",
    percent: "1.33%",
  },
  {
    id: "uni",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
    label: "UNI",
    percent: "0.42%",
  },
  {
    id: "usd",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    label: "USDC",
    percent: "-0.12%",
  },
  {
    id: "dai",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    label: "DAI",
    percent: "0.01%",
  },
  {
    id: "polygon",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x0000000000000000000000000000000000001010/logo.png",
    label: "POL",
    percent: "0.77%",
  },
  {
    id: "aave",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
    label: "AAVE",
    percent: "-4.56%",
  },
  {
    id: "link",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
    label: "LINK",
    percent: "-3.66%",
  },
];

const randomizeToken = (t: Token, viewportWidth: number, viewportHeight: number) => {
  const maxSize = SHARED_RANGES.sizeRange[1];
  const padding = maxSize / 2;

  const size = randInt(SHARED_RANGES.sizeRange[0], SHARED_RANGES.sizeRange[1]);
  const left = randInt(padding, Math.max(padding, viewportWidth - maxSize - padding));
  const top = randInt(padding, Math.max(padding, viewportHeight - maxSize - padding));
  const rotate = randInt(SHARED_RANGES.rotateRange[0], SHARED_RANGES.rotateRange[1]);
  const blur = randFloat(SHARED_RANGES.blurRange[0], SHARED_RANGES.blurRange[1], 1);
  const floatDuration = randFloat(SHARED_RANGES.floatDurationRange[0], SHARED_RANGES.floatDurationRange[1], 1);

  return {
    ...t,
    size,
    left,
    top,
    rotate,
    blur,
    floatDuration,
  };
};

const HeroTokens = () => {
  const [randomized, setRandomized] = useState<Token[]>([]);

  useEffect(() => {
    const updateRandomized = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setRandomized(SAMPLE_TOKENS.map(t => randomizeToken(t, width, height)));
    };

    updateRandomized();

    window.addEventListener("resize", updateRandomized);
    return () => window.removeEventListener("resize", updateRandomized);
  }, []);

  return (
    <div className="pointer-events-none absolute flex h-full w-full flex-col items-stretch justify-center overflow-hidden bg-gradient-to-b from-[#060616] via-[#07081a] to-[#0b1020] pt-[72px] text-white">
      <div className="pointer-events-none absolute inset-0 hidden w-[100vw] overflow-hidden contain-strict md:block">
        <div className="relative h-full w-full">
          {randomized.map(t => (
            <TokenBadge key={t.id} token={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroTokens;
