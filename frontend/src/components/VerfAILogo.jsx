import styled, { keyframes } from 'styled-components';

/* ── Keyframes ── */

const drawIn = keyframes`
  to { stroke-dashoffset: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const scanSweep = keyframes`
  0%   { transform: translateY(0px);   opacity: 0; }
  6%   { opacity: 1; }
  88%  { opacity: 0.85; }
  100% { transform: translateY(9.5px); opacity: 0; }
`;

const ringExpand = keyframes`
  0%   { r: 1.3;  opacity: 0.75; }
  100% { r: 5.5;  opacity: 0; }
`;

const dotGlow = keyframes`
  0%, 100% { opacity: 1;   r: 1.25; }
  50%       { opacity: 0.5; r: 1.6; }
`;

const bracketPulse = keyframes`
  0%, 100% { opacity: 0.9; }
  50%       { opacity: 0.4; }
`;

const scanLine2Blink = keyframes`
  0%, 100% { opacity: 0.45; }
  50%       { opacity: 0.15; }
`;

/* ── Styled SVG ── */

const AnimSVG = styled.svg`
  overflow: visible;

  /* Corner bracket TL */
  .br-tl {
    stroke-dasharray: 8;
    stroke-dashoffset: 8;
    animation: ${drawIn} 0.45s ease 0.05s forwards,
               ${bracketPulse} 2.8s ease-in-out 1.4s infinite;
    opacity: 0;
  }
  /* Corner bracket TR */
  .br-tr {
    stroke-dasharray: 8;
    stroke-dashoffset: 8;
    animation: ${drawIn} 0.45s ease 0.2s forwards,
               ${bracketPulse} 2.8s ease-in-out 1.55s infinite;
    opacity: 0;
  }

  /* V left arm */
  .v-left {
    stroke-dasharray: 13;
    stroke-dashoffset: 13;
    animation: ${drawIn} 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  /* V right arm */
  .v-right {
    stroke-dasharray: 13;
    stroke-dashoffset: 13;
    animation: ${drawIn} 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.65s forwards;
    opacity: 0;
    animation-fill-mode: forwards;
  }

  /* Static scan marks — appear after V draws */
  .mark-1 {
    opacity: 0;
    animation: ${fadeIn} 0.3s ease 1.1s forwards;
  }
  .mark-2 {
    opacity: 0;
    animation: ${fadeIn} 0.3s ease 1.2s forwards,
               ${scanLine2Blink} 2.8s ease-in-out 1.5s infinite;
  }

  /* Focal dot */
  .focal-dot {
    opacity: 0;
    animation: ${fadeIn} 0.4s ease 1.05s forwards,
               ${dotGlow} 2.8s ease-in-out 1.5s infinite;
  }

  /* Expanding ring — repeating pulse from focal point */
  .focal-ring {
    opacity: 0;
    animation: ${ringExpand} 2.8s ease-out 1.5s infinite;
  }

  /* Moving scan beam — clipped to V triangle */
  .scan-beam {
    opacity: 0;
    animation: ${scanSweep} 2.8s cubic-bezier(0.4, 0, 0.6, 1) 1.5s infinite;
  }
`;

export default function VerfAILogo({ size = 16 }) {
  return (
    <AnimSVG
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Clip the scan beam to the V-triangle interior */}
        <clipPath id="verfai-v-clip">
          <polygon points="2.5,3 8,12.5 13.5,3" />
        </clipPath>
      </defs>

      {/* ── Scan beam (moves top→bottom, clipped to V) ── */}
      <g clipPath="url(#verfai-v-clip)">
        <line
          className="scan-beam"
          x1="0" y1="3"
          x2="16" y2="3"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0"
        />
      </g>

      {/* ── Corner brackets ── */}
      <path
        className="br-tl"
        d="M2 5 L2 2.5 L4.5 2.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="br-tr"
        d="M11.5 2.5 L14 2.5 L14 5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── V beam arms ── */}
      <line
        className="v-left"
        x1="2.5" y1="3"
        x2="8"   y2="12.5"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <line
        className="v-right"
        x1="13.5" y1="3"
        x2="8"    y2="12.5"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />

      {/* ── Static scan marks ── */}
      <line
        className="mark-1"
        x1="4.6" y1="6.8"
        x2="11.4" y2="6.8"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      <line
        className="mark-2"
        x1="5.9" y1="9.6"
        x2="10.1" y2="9.6"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
      />

      {/* ── Focal point ── */}
      {/* Expanding ring */}
      <circle
        className="focal-ring"
        cx="8" cy="12.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
      />
      {/* Solid dot */}
      <circle
        className="focal-dot"
        cx="8" cy="12.5"
        r="1.25"
        fill="currentColor"
      />
    </AnimSVG>
  );
}
