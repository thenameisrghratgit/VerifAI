import styled from 'styled-components';

const StyledWrapper = styled.div`
  .btn-wrapper {
    position: relative;
    display: inline-block;
  }

  .btn {
    --border-radius: 24px;
    --padding: 4px;
    --transition: 0.4s;
    --button-color: #0e1318;
    --highlight-color-hue: 142deg;

    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7em 1.4em 0.7em 1.1em;
    font-family: var(--f-ui, 'Manrope', sans-serif);
    font-size: 1em;
    font-weight: 500;
    background-color: var(--button-color);
    box-shadow:
      inset 0px 1px 1px rgba(255,255,255,0.18),
      inset 0px 2px 2px rgba(255,255,255,0.12),
      inset 0px 4px 4px rgba(255,255,255,0.08),
      inset 0px 8px 8px rgba(255,255,255,0.04),
      0px -1px 1px rgba(0,0,0,0.03),
      0px -2px 2px rgba(0,0,0,0.05),
      0px -4px 4px rgba(0,0,0,0.06),
      0px -8px 8px rgba(0,0,0,0.07);
    border: solid 1px rgba(255,255,255,0.1);
    border-radius: var(--border-radius);
    cursor: pointer;
    position: relative;
    overflow: visible;
    transition:
      box-shadow var(--transition),
      border var(--transition),
      background-color var(--transition);
  }

  .btn::before {
    content: "";
    position: absolute;
    top: calc(0px - var(--padding));
    left: calc(0px - var(--padding));
    width: calc(100% + var(--padding) * 2);
    height: calc(100% + var(--padding) * 2);
    border-radius: calc(var(--border-radius) + var(--padding));
    pointer-events: none;
    background-image: linear-gradient(0deg, #0004, #000a);
    z-index: -1;
    transition:
      box-shadow var(--transition),
      filter var(--transition);
    box-shadow:
      0 -8px 8px -6px #0000 inset,
      0 -16px 16px -8px #00000000 inset,
      1px 1px 1px rgba(255,255,255,0.1),
      2px 2px 2px rgba(255,255,255,0.06),
      -1px -1px 1px rgba(0,0,0,0.12),
      -2px -2px 2px rgba(0,0,0,0.06);
  }

  .btn::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    pointer-events: none;
    background-image: linear-gradient(
      0deg,
      #fff,
      hsl(var(--highlight-color-hue), 80%, 60%),
      hsla(var(--highlight-color-hue), 80%, 60%, 40%),
      8%,
      transparent
    );
    background-position: 0 0;
    opacity: 0;
    transition:
      opacity var(--transition),
      filter var(--transition);
  }

  /* Hover */
  .btn:hover {
    border: solid 1px hsla(var(--highlight-color-hue), 80%, 60%, 45%);
  }

  .btn:hover::before {
    box-shadow:
      0 -8px 8px -6px rgba(255,255,255,0.9) inset,
      0 -16px 16px -8px hsla(var(--highlight-color-hue), 80%, 55%, 35%) inset,
      1px 1px 1px rgba(255,255,255,0.12),
      2px 2px 2px rgba(255,255,255,0.06),
      -1px -1px 1px rgba(0,0,0,0.12),
      -2px -2px 2px rgba(0,0,0,0.06);
  }

  .btn:hover::after {
    opacity: 1;
    mask-image: linear-gradient(0deg, #fff, transparent);
  }


  .btn:hover .btn-letter {
    color: #fff;
    text-shadow: 0 0 6px hsla(var(--highlight-color-hue), 80%, 70%, 0.7);
  }

  /* Light mode overrides */
  html.light & .btn {
    --button-color: #f3f4f6;
    border-color: rgba(0,0,0,0.12);
    box-shadow:
      inset 0px 1px 1px rgba(255,255,255,0.9),
      inset 0px 2px 2px rgba(255,255,255,0.7),
      0px 1px 2px rgba(0,0,0,0.08),
      0px 2px 4px rgba(0,0,0,0.06);
  }

  html.light & .btn-letter {
    color: rgba(30,40,50,0.7);
    animation: letter-anim-light 2.5s ease-in-out infinite;
  }

  @keyframes letter-anim-light {
    50% {
      color: rgba(15,25,35,0.95);
      text-shadow: 0 0 4px rgba(34,197,94,0.35);
    }
  }

  html.light & .btn-svg-upload {
    stroke: rgba(50,65,80,0.65);
  }

  html.light & .btn-svg-sparkle {
    fill: rgba(50,65,80,0.5);
  }

  html.light & .btn:hover {
    border-color: hsla(var(--highlight-color-hue), 60%, 45%, 55%);
    background-color: #e9fbe9;
    box-shadow:
      inset 0px 1px 1px rgba(255,255,255,0.9),
      0px 0px 12px rgba(34,197,94,0.2),
      0px 2px 6px rgba(0,0,0,0.08);
  }

  html.light & .btn:hover .btn-letter {
    color: #1a2e1a;
    text-shadow: 0 0 6px rgba(34,197,94,0.4);
    animation: none;
  }

  html.light & .btn:hover .btn-svg-upload {
    stroke: #16a34a;
    filter: drop-shadow(0 0 3px rgba(34,197,94,0.5));
  }

  html.light & .btn:hover .btn-svg-sparkle {
    fill: #16a34a;
    filter: drop-shadow(0 0 3px rgba(34,197,94,0.5));
    animation: none;
  }

  /* Active */
  .btn:active {
    border: solid 1px hsla(var(--highlight-color-hue), 80%, 70%, 70%);
    background-color: hsla(var(--highlight-color-hue), 40%, 15%, 0.6);
  }

  .btn:active::after {
    opacity: 1;
    mask-image: linear-gradient(0deg, #fff, transparent);
    filter: brightness(200%);
  }

  /* Icons */
  .btn-svg-upload {
    height: 16px;
    width: 16px;
    margin-right: 8px;
    flex-shrink: 0;
    stroke: rgba(200,220,200,0.75);
    transition: stroke var(--transition), filter var(--transition);
  }

  .btn-svg-sparkle {
    height: 14px;
    width: 14px;
    margin-left: 8px;
    flex-shrink: 0;
    fill: rgba(200,220,200,0.65);
    animation: flicker 2.5s linear infinite;
    animation-delay: 0.5s;
    filter: drop-shadow(0 0 2px rgba(255,255,255,0.4));
    transition: fill var(--transition), filter var(--transition);
  }

  .btn:hover .btn-svg-upload {
    stroke: hsl(var(--highlight-color-hue), 70%, 75%);
    filter: drop-shadow(0 0 4px hsl(var(--highlight-color-hue), 80%, 60%));
  }

  .btn:hover .btn-svg-sparkle {
    fill: hsl(var(--highlight-color-hue), 70%, 75%);
    filter: drop-shadow(0 0 4px hsl(var(--highlight-color-hue), 80%, 60%));
    animation: none;
  }

  @keyframes flicker {
    50% { opacity: 0.4; }
  }

  /* Text */
  .txt-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .btn-letter {
    position: relative;
    display: inline-block;
    color: rgba(255,255,255,0.55);
    animation: letter-anim 2.5s ease-in-out infinite;
    transition:
      color var(--transition),
      text-shadow var(--transition);
  }

  @keyframes letter-anim {
    50% {
      text-shadow: 0 0 4px rgba(255,255,255,0.6);
      color: rgba(255,255,255,0.9);
    }
  }

  .btn-letter:nth-child(1)  { animation-delay: 0s; }
  .btn-letter:nth-child(2)  { animation-delay: 0.07s; }
  .btn-letter:nth-child(3)  { animation-delay: 0.14s; }
  .btn-letter:nth-child(4)  { animation-delay: 0.21s; }
  .btn-letter:nth-child(5)  { animation-delay: 0.28s; }
  .btn-letter:nth-child(6)  { animation-delay: 0.35s; }
  .btn-letter:nth-child(7)  { animation-delay: 0.42s; }
  .btn-letter:nth-child(8)  { animation-delay: 0.49s; }
  .btn-letter:nth-child(9)  { animation-delay: 0.56s; }
  .btn-letter:nth-child(10) { animation-delay: 0.63s; }
  .btn-letter:nth-child(11) { animation-delay: 0.70s; }
  .btn-letter:nth-child(12) { animation-delay: 0.77s; }
`;

const LABEL = 'New Analysis';

// Light-mode CSS is appended inside StyledWrapper below

export default function NewAnalysisButton({ onClick }) {
  return (
    <StyledWrapper>
      <div className="btn-wrapper">
        <button className="btn" onClick={onClick}>
          {/* Upload icon */}
          <svg
            className="btn-svg-upload"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div className="txt-wrapper">
            {LABEL.split('').map((ch, i) =>
              ch === ' '
                ? <span key={i} style={{ display: 'inline-block', width: '0.3em' }} />
                : <span key={i} className="btn-letter">{ch}</span>
            )}
          </div>
          {/* Sparkle icon */}
          <svg
            className="btn-svg-sparkle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
}
