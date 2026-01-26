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
    img: "/tokens/crv-logo.png",
    label: "CRV",
    percent: "1.33%",
  },
  {
    id: "uni",
    img: "/tokens/uni-logo.png",
    label: "UNI",
    percent: "0.42%",
  },
  {
    id: "usdc",
    img: "/tokens/usdc-logo.png",
    label: "USDC",
    percent: "-0.12%",
  },
  {
    id: "dai",
    img: "/tokens/dai-logo.png",
    label: "DAI",
    percent: "0.01%",
  },
  {
    id: "polygon",
    img: "/tokens/pol-logo.png",
    label: "POL",
    percent: "0.77%",
  },
  {
    id: "aave",
    img: "/tokens/aave-logo.png",
    label: "AAVE",
    percent: "-4.56%",
  },
  {
    id: "link",
    img: "/tokens/link-logo.png",
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
