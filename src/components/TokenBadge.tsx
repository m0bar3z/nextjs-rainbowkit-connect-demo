import { Token } from "./HeroTokens";

const TokenBadge = ({ token }: { token: Token }) => {
  const { img, label, percent, left, top, size = 82, rotate = 0, blur = 6, floatDuration = 6 } = token;

  const cssVars: React.CSSProperties = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${size}px`,
    height: `${size}px`,
    ["--float-duration" as never]: `${floatDuration}s`,
    ["--initial-rotate" as never]: `${rotate}deg`,
    ["--initial-blur" as never]: `${blur}px`,
    ["--token-size" as never]: `${size}px`,
  };

  return (
    <div
      className="group pointer-events-auto absolute select-none hover:cursor-pointer"
      style={cssVars}
      aria-label={`${label} token`}
      role="button"
      tabIndex={0}
    >
      <div
        className="floating relative rounded-full"
        style={{ width: "var(--token-size)", height: "var(--token-size)", transformOrigin: "center" }}
      >
        <div
          className="tokenVisual rounded-full border-transparent transition-[filter,transform,opacity] duration-150 ease-in-out"
          style={{
            position: "relative",
            overflow: "hidden",
            opacity: 0.95,
            display: "block",
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `rotate(${rotate}deg)`,
            filter: `blur(${blur}px)`,
            width: "100%",
            height: "100%",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(255,255,255,0)", boxSizing: "border-box" }}
        />

        <div className="pointer-events-auto absolute top-1/2 left-full z-20 ml-3 flex -translate-y-1/2 items-center gap-2 rounded-md bg-black/60 px-3 py-2 text-xs text-white opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 group-focus:opacity-100">
          <div className="font-semibold">{label}</div>
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                d="M10.6979 16.2453L6.31787 9.75247C5.58184 8.66118 6.2058 7 7.35185 7L16.6482 7C17.7942 7 18.4182 8.66243 17.6821 9.75247L13.3021 16.2453C12.623 17.2516 11.377 17.2516 10.6979 16.2453Z"
                fill="currentColor"
              />
            </svg>
            <span>{percent}</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* faster base animation; uses CSS variables so each token can override */
        @keyframes floatA {
          0% {
            transform: translate3d(0, 0, 0) rotate(var(--initial-rotate));
          }
          50% {
            transform: translate3d(0, -12px, 0) rotate(var(--initial-rotate));
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(var(--initial-rotate));
          }
        }

        .group .floating {
          animation: floatA var(--float-duration) ease-in-out infinite;
          will-change: transform, opacity;
        }

        /* On hover/focus: unblur only (animation speed remains the same) */
        .group:hover .tokenVisual,
        .group:focus .tokenVisual,
        .group:focus-visible .tokenVisual {
          filter: blur(0px) !important;
        }

        /* keep motion off for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .group .floating {
            animation: none !important;
            transform: translate3d(0, 0, 0) rotate(var(--initial-rotate));
          }
          .group .tokenVisual {
            filter: none !important;
          }
        }

        /* Hide tokens and animations on small screens (phones) for performance and clarity */
        @media (max-width: 767px) {
          .tokenVisual,
          .group,
          .floating {
            display: none !important;
            animation: none !important;
          }
        }

        /* small accessibility tweak: show hover overlay on keyboard focus */
        .group:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default TokenBadge;
