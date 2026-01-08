"use client";

import { useMemo } from "react";
import TokenBadge from "./TokenBadge";

export type Token = {
  id: string;
  img: string;
  label: string;
  percent: string;

  left?: number;
  top?: number;

  size?: number;
  rotate?: number;
  blur?: number;
  floatDuration?: number;

  sizeRange?: [number, number];
  leftRange?: [number, number];
  topRange?: [number, number];
  rotateRange?: [number, number];
  blurRange?: [number, number];
  floatDurationRange?: [number, number];
};

const getRandomFloadDuration = () => {
  const randValue = Math.floor(Math.random() * 10);
  return randValue < 6 ? 4 : randValue;
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
    left: 120,
    top: 160,
    // ranges (min, max)
    sizeRange: [56, 92],
    rotateRange: [-20, 20],
    blurRange: [6, 12],
    leftRange: [40, 200],
    topRange: [120, 260],
    floatDurationRange: [3, 8],
  },
  {
    id: "uni",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
    label: "UNI",
    percent: "0.42%",
    left: 420,
    top: 80,
    sizeRange: [80, 120],
    rotateRange: [-25, 10],
    blurRange: [6, 12],
    leftRange: [360, 520],
    topRange: [40, 140],
    floatDurationRange: [4, 9],
  },
  {
    id: "usd",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    label: "USDC",
    percent: "-0.12%",
    left: 760,
    top: 220,
    sizeRange: [56, 88],
    rotateRange: [-8, 12],
    blurRange: [6, 12],
    leftRange: [680, 820],
    topRange: [160, 260],
    floatDurationRange: [3.5, 7],
  },
  {
    id: "dai",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    label: "DAI",
    percent: "0.01%",
    left: 1400,
    top: 500,
    sizeRange: [48, 76],
    rotateRange: [-6, 14],
    blurRange: [6, 12],
    leftRange: [1320, 1480],
    topRange: [440, 560],
    floatDurationRange: [3, 6.5],
  },
  {
    id: "polygon",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x0000000000000000000000000000000000001010/logo.png",
    label: "POL",
    percent: "0.77%",
    left: 1700,
    top: 800,
    sizeRange: [72, 104],
    rotateRange: [-10, 18],
    blurRange: [6, 12],
    leftRange: [1600, 1760],
    topRange: [720, 880],
    floatDurationRange: [4, 9],
  },
  {
    id: "aave",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
    label: "AAVE",
    percent: "-4.56%",
    left: 900,
    top: 900,
    sizeRange: [48, 80],
    rotateRange: [-12, 12],
    blurRange: [6, 12],
    leftRange: [820, 980],
    topRange: [820, 980],
    floatDurationRange: [3, 7],
  },
  {
    id: "link",
    img: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
    label: "LINK",
    percent: "-3.66%",
    left: 450,
    top: 600,
    sizeRange: [48, 80],
    rotateRange: [-15, 15],
    blurRange: [6, 12],
    leftRange: [380, 520],
    topRange: [540, 660],
    floatDurationRange: [3, 7],
  },
];

const randomizeToken = (t: Token): Token => {
  const size = t.sizeRange ? randInt(t.sizeRange[0], t.sizeRange[1]) : (t.size ?? randInt(48, 100));
  const left = t.leftRange ? randInt(t.leftRange[0], t.leftRange[1]) : (t.left ?? 0);
  const top = t.topRange ? randInt(t.topRange[0], t.topRange[1]) : (t.top ?? 0);
  const rotate = t.rotateRange ? randInt(t.rotateRange[0], t.rotateRange[1]) : (t.rotate ?? randInt(-20, 20));
  const blur = t.blurRange ? randFloat(t.blurRange[0], t.blurRange[1], 1) : (t.blur ?? randFloat(0, 10, 1));
  const floatDuration = t.floatDurationRange
    ? randFloat(t.floatDurationRange[0], t.floatDurationRange[1], 1)
    : (t.floatDuration ?? getRandomFloadDuration());

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
  const randomized = useMemo(() => SAMPLE_TOKENS.map(randomizeToken), []);

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
