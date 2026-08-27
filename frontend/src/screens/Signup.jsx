import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import VerfAILogo from '../components/VerfAILogo';

/* ── Animations ─────────────────────────────────── */

const shineLoop = keyframes`
  from { background-position: 0 center; }
  to   { background-position: 320px center; }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.18; }
  50%       { opacity: 0.38; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const dotBlink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`;

/* ── Left panel ─────────────────────────────────── */

const Left = styled.div`
  position: relative;
  flex: 1.1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 52px 56px;
  background-color: #F7F9FC;
  overflow: hidden;

  background-image: radial-gradient(circle, #E2E8F0 1px, transparent 1px);
  background-size: 28px 28px;

  &::after {
    content: '';
    position: absolute;
    bottom: -120px;
    left: -80px;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(22,163,74,0.14) 0%, transparent 70%);
    animation: ${pulseGlow} 4s ease-in-out infinite;
    pointer-events: none;
  }
`;

const ShineTitle = styled.h1`
  font-family: var(--f-heading);
  font-size: 52px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 12px;
  background: linear-gradient(
    to right,
    #374151   0%,
    #1e293b  18%,
    #0f172a  32%,
    #16a34a  40%,
    #052e16  48%,
    #16a34a  56%,
    #1e293b  70%,
    #374151 100%
  );
  background-size: 320px auto;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shineLoop} 3s linear infinite;
`;

const SubMono = styled.p`
  font-family: var(--f-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #475569;
  margin: 0 0 40px;
`;

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 24px;
  animation: ${fadeUp} 0.6s ease both;
  animation-delay: ${p => p.$delay || '0s'};

  .icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(22,163,74,0.1);
    border: 1px solid rgba(22,163,74,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #16A34A;
    margin-top: 1px;
  }

  .text h3 {
    font-family: var(--f-ui);
    font-size: 15px;
    font-weight: 700;
    color: #0F172A;
    margin: 0 0 3px;
  }

  .text p {
    font-family: var(--f-ui);
    font-size: 13px;
    color: #475569;
    margin: 0;
    line-height: 1.55;
  }
`;

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 32px;
  border-top: 1px solid #E2E8F0;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #16A34A;
    animation: ${dotBlink} 2s ease-in-out infinite;
  }

  span {
    font-family: var(--f-mono);
    font-size: 10px;
    color: #475569;
    letter-spacing: 0.06em;
  }

  span b { color: #16A34A; font-weight: 600; }
`;

/* ── Right panel ────────────────────────────────── */

const Right = styled.div`
  width: 620px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 60px 60px 56px;
  background-color: #F1F5F9;
  border-left: 1px solid #E2E8F0;
`;

const Card = styled.div`
  width: 420px;
  background: #ffffff;
  border-radius: 20px;
  padding: 32px 30px 28px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
  animation: ${fadeUp} 0.5s ease 0.15s both;

  h2 {
    font-family: var(--f-heading);
    font-size: 26px;
    font-weight: 700;
    color: #151717;
    margin: 0 0 4px;
    letter-spacing: -0.01em;
  }

  .subtitle {
    font-family: var(--f-ui);
    font-size: 13px;
    color: #6b7280;
    margin: 0 0 24px;
  }
`;

const FieldLabel = styled.div`
  label {
    display: block;
    font-family: var(--f-ui);
    font-size: 14px;
    font-weight: 600;
    color: #151717;
    margin-bottom: 6px;
  }
`;

const InputRow = styled.div`
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 14px;
  transition: border-color 0.2s ease;
  background: #fff;

  &:focus-within {
    border-color: #2d79f3;
  }

  svg { color: #6b7280; flex-shrink: 0; }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-family: var(--f-ui);
    font-size: 13px;
    color: #151717;
    background: transparent;
    padding: 0 8px;
  }

  input::placeholder { color: #9ca3af; }

  .eye-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: #9ca3af;
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }

  .eye-btn:hover { color: #6b7280; }
`;

const SignInWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 4px 0 14px;
  display: flex;
  justify-content: center;
  filter: drop-shadow(0 4px 8px #0003);

  .si-cbox {
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
  }

  .si-btn {
    --color-1: 180, 220, 255;
    --color-bg: 10, 5, 20;
    --color-fg: 230, 230, 240;
    --border-radius: 10px;
    --pad: 1px;

    width: 100%;
    cursor: pointer;
    font-size: 15px;
    font-family: var(--f-ui);
    font-weight: 600;
    letter-spacing: 0.12em;
    color: rgba(var(--color-fg), 0.45);
    text-shadow: 0 0 2px rgba(var(--color-1), 0.4);
    text-transform: uppercase;

    position: relative;
    padding: 14px 36px;
    background:
      radial-gradient(circle at center, #0000 30%, #fff1 41%, #0000 43%),
      radial-gradient(circle at center, #0000 50%, #fff1 55%, #0000 60%),
      radial-gradient(circle at 75% 15%, #fff5 0.5%, #0000 2%),
      radial-gradient(circle at 78% 5%, #fff2 1%, #0000 10%),
      conic-gradient(
        from 135deg at 50% 50%,
        #0000,
        rgba(var(--color-1), 0.12),
        #0000,
        rgba(var(--color-1), 0.08),
        #0000
      ),
      radial-gradient(circle at center, #000 65%, #fff1),
      conic-gradient(
        from 85deg at 50% 40%,
        #0000,
        rgba(100, 0, 200, 0.9),
        #0000,
        rgba(var(--color-1), 0.45),
        #0000
      ),
      rgba(var(--color-bg), 0.6);
    border: none;
    border-radius: var(--border-radius);
    overflow: clip;
    overflow-clip-margin: var(--pad);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0;

    transition: color 0.3s ease, border-radius 0.3s ease;
  }

  .si-btn::before {
    content: "";
    position: absolute;
    inset: calc(-1 * var(--pad));
    background: rgba(var(--color-1), 0.12);
    border-radius: calc(var(--border-radius) + var(--pad));
    z-index: -1;
  }

  .si-btn::after {
    content: "";
    position: absolute;
    width: 200%;
    height: 50%;
    top: 25%;
    left: -50%;
    background: rgba(255,255,255,0.4) linear-gradient(to left, rgba(var(--color-1),1), #fff8);
    border-radius: calc(var(--border-radius) + var(--pad));
    z-index: -1;
    filter: blur(4px) drop-shadow(0 -20px 20px rgba(var(--color-1),0.6)) drop-shadow(0 -10px 0 rgba(var(--color-1),0.6));
    animation: si-rotate 3s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  @keyframes si-rotate {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }

  @keyframes si-letter-glow {
    50% {
      color: rgba(var(--color-fg), 1);
      text-shadow: 0 0 8px rgba(var(--color-1), 0.9);
    }
  }

  @keyframes si-flash {
    0%  { opacity: 0; }
    50% { opacity: 1; filter: blur(40px); }
    100%{ opacity: 0; }
  }

  .si-letter {
    display: inline-block;
    position: relative;
    animation: si-letter-glow 1.7s ease infinite;
  }
  .si-letter:nth-child(1) { animation-delay: 0.3s; }
  .si-letter:nth-child(2) { animation-delay: 0.2s; }
  .si-letter:nth-child(3) { animation-delay: 0.1s; }
  .si-letter:nth-child(4) { animation-delay: 0.0s; }
  .si-letter:nth-child(5) { animation-delay: 0.1s; }
  .si-letter:nth-child(6) { animation-delay: 0.2s; }
  .si-letter:nth-child(7) { animation-delay: 0.3s; }

  .si-shutter-wrapper {
    --angle: 120deg;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: rotate(var(--angle));
  }

  .si-shutter {
    position: absolute;
    width: 100%;
    aspect-ratio: 1;
    align-self: center;
    left: 50%;
    background:
      url(data:image/png;base64,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),
      linear-gradient(to top, #000, 0%, #000, 50%, #555560);
    background-position: 0px 0px, 0 0;
    mask-image:
      radial-gradient(circle at -50% -20%, transparent 66%, white 66.3%),
      radial-gradient(circle at -50% 50%, transparent 90%, white 91%);
    mask-composite: subtract;
    mask-position: 0px 0px, 0px 100%;
    mask-size: 100% 100%;
    transition: mask-position 0.2s ease, mask-size 0.2s ease, transform 0.3s ease, opacity 0.3s ease;
    pointer-events: none;
    transform-origin: center left;
  }
  .si-shutter.s-1 { z-index:1; transform: rotate(0deg); }
  .si-shutter.s-2 { z-index:2; transform: rotate(60deg); }
  .si-shutter.s-3 { z-index:3; transform: rotate(120deg); }
  .si-shutter.s-4 { z-index:4; transform: rotate(180deg); }
  .si-shutter.s-5 { z-index:5; transform: rotate(240deg); }
  .si-shutter.s-6 { z-index:6; transform: rotate(300deg); }

  .si-flash {
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: rgb(255,255,255);
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .si-cbox:checked ~ .si-flash {
    opacity: 1;
    animation: si-flash 0.5s ease-out forwards;
    animation-delay: -0.15s;
  }

  .si-btn:hover {
    --border-radius: 30px;
    color: rgba(var(--color-fg), 1);
    text-shadow: 0 0 2px rgba(var(--color-fg), 1);
  }
  .si-btn:hover::after { opacity: 1; }
  .si-btn:hover .si-shutter-wrapper {
    opacity: 0.85;
    transform: rotate(calc(var(--angle) - 5deg));
  }
  .si-btn:hover .si-shutter {
    mask-position: -25px 0%, 0% 100%;
  }
  .si-btn:active .si-shutter-wrapper {
    opacity: 1;
    transform: rotate(calc(var(--angle) - 25deg));
  }
  .si-btn:active .si-shutter {
    mask-position: -109px 0%, 0% 100%;
    mask-size: 120% 100%;
  }
`;

const P = styled.p`
  text-align: center;
  color: #151717;
  font-family: var(--f-ui);
  font-size: 14px;
  margin: 6px 0;

  .link {
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
    margin-left: 4px;
    background: none;
    border: none;
    font-size: 14px;
    font-family: var(--f-ui);
    padding: 0;
  }
  .link:hover { text-decoration: underline; }
`;

const OrDivider = styled.p`
  text-align: center;
  color: #6b7280;
  font-family: var(--f-ui);
  font-size: 14px;
  margin: 8px 0;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 38%;
    height: 1px;
    background: #e5e7eb;
  }
  &::before { left: 0; }
  &::after  { right: 0; }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SocialBtn = styled.button`
  flex: 1;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ededef;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--f-ui);
  font-size: 14px;
  font-weight: 500;
  color: #151717;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover { border-color: #2d79f3; }
`;

/* ── Icons ──────────────────────────────────────── */

const UserIcon = () => (
  <svg height={18} width={18} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);

const MailIcon = () => (
  <svg height={18} viewBox="0 0 32 32" width={18} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
  </svg>
);

const LockIcon = () => (
  <svg height={18} viewBox="-64 0 512 512" width={18} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
  </svg>
);

const EyeIcon = () => (
  <svg width={16} height={16} viewBox="0 0 576 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
  </svg>
);

const ScanIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);

const EyeFeatureIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FBBB00" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"/>
    <path fill="#518EF8" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176z"/>
    <path fill="#28B446" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"/>
    <path fill="#F14336" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 22.773 22.773" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"/>
    <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"/>
  </svg>
);

/* ── Main component ─────────────────────────────── */

export default function Signup({ onSignup, onGoToLogin }) {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    onSignup();
  };

  const LABEL = 'Sign Up';

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* ── Left branding panel ── */}
      <Left>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '14px',
              backgroundColor: '#16A34A', color: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(22,163,74,0.45)', flexShrink: 0,
            }}>
              <VerfAILogo size={36} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--f-heading)', fontSize: '24px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.01em', lineHeight: 1 }}>VerifAI</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', fontWeight: '600', color: '#475569', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '3px' }}>Media Forensics</div>
            </div>
          </div>

          <ShineTitle>Verify<br />what you see.</ShineTitle>
          <SubMono>AI-powered media forensics platform</SubMono>

          <Feature $delay="0.35s">
            <div className="icon"><ScanIcon /></div>
            <div className="text">
              <h3>Deep Media Scanning</h3>
              <p>Analyze video, image, audio and text for synthetic manipulation signatures.</p>
            </div>
          </Feature>
          <Feature $delay="0.5s">
            <div className="icon"><ShieldCheckIcon /></div>
            <div className="text">
              <h3>Forensic Verification</h3>
              <p>Multi-layer evidence vectors with confidence scoring and full audit trails.</p>
            </div>
          </Feature>
          <Feature $delay="0.65s">
            <div className="icon"><EyeFeatureIcon /></div>
            <div className="text">
              <h3>Real-time Intelligence</h3>
              <p>Live investigation pipeline connected to the latest detection models.</p>
            </div>
          </Feature>
        </div>

        <StatusBar>
          <div className="dot" />
          <span>All systems <b>operational</b></span>
        </StatusBar>
      </Left>

      {/* ── Right panel ── */}
      <Right>
        <Card>
          <h2>Create account</h2>
          <p className="subtitle">Join VerifAI to start verifying media.</p>

          <form onSubmit={handleSubmit}>
            <FieldLabel><label>Name</label></FieldLabel>
            <InputRow>
              <UserIcon />
              <input
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </InputRow>

            <FieldLabel><label>Email</label></FieldLabel>
            <InputRow>
              <MailIcon />
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </InputRow>

            <FieldLabel><label>Password</label></FieldLabel>
            <InputRow style={{ marginBottom: '20px' }}>
              <LockIcon />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Create a Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button type="button" className="eye-btn" onClick={() => setShowPass(s => !s)}>
                <EyeIcon />
              </button>
            </InputRow>

            <SignInWrap>
              <input className="si-cbox" type="checkbox" />
              <button type="submit" className="si-btn">
                {LABEL.split('').map((ch, i) =>
                  ch === ' '
                    ? <span key={i} style={{ display: 'inline-block', width: '0.35em' }} />
                    : <span key={i} className="si-letter">{ch}</span>
                )}
                <div className="si-shutter-wrapper">
                  <span className="si-shutter s-1" />
                  <span className="si-shutter s-2" />
                  <span className="si-shutter s-3" />
                  <span className="si-shutter s-4" />
                  <span className="si-shutter s-5" />
                  <span className="si-shutter s-6" />
                </div>
              </button>
              <div className="si-flash" />
            </SignInWrap>
          </form>

          <P>Already have an account?<button className="link" onClick={onGoToLogin}>Sign In</button></P>
          <OrDivider>Or With</OrDivider>

          <SocialRow>
            <SocialBtn type="button"><GoogleIcon /> Google</SocialBtn>
            <SocialBtn type="button"><AppleIcon /> Apple</SocialBtn>
          </SocialRow>
        </Card>
      </Right>
    </div>
  );
}
