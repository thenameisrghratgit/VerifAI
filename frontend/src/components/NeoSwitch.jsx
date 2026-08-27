import { useId } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .neo-toggle-container {
    --toggle-width: 36px;
    --toggle-height: 20px;
    --toggle-bg: #171C22;
    --toggle-off-color: #475057;
    --toggle-on-color: #22C55E;
    --toggle-transition: 0.4s cubic-bezier(0.25, 1, 0.5, 1);

    position: relative;
    display: inline-flex;
    user-select: none;
  }

  .neo-toggle-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .neo-toggle {
    position: relative;
    width: var(--toggle-width);
    height: var(--toggle-height);
    display: block;
    cursor: pointer;
    transform: translateZ(0);
    perspective: 500px;
  }

  .neo-track {
    position: absolute;
    inset: 0;
    border-radius: calc(var(--toggle-height) / 2);
    overflow: hidden;
    transform-style: preserve-3d;
    transform: translateZ(-1px);
    transition: transform var(--toggle-transition);
    box-shadow:
      0 2px 6px rgba(0,0,0,0.5),
      inset 0 0 0 1px rgba(255,255,255,0.08);
  }

  .neo-background-layer {
    position: absolute;
    inset: 0;
    background: var(--toggle-bg);
    background-image: linear-gradient(
      -45deg,
      rgba(20,20,20,0.8) 0%,
      rgba(30,30,30,0.3) 50%,
      rgba(20,20,20,0.8) 100%
    );
    transition: all var(--toggle-transition);
  }

  .neo-grid-layer {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(71,80,87,0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(71,80,87,0.06) 1px, transparent 1px);
    background-size: 4px 4px;
    opacity: 0;
    transition: opacity var(--toggle-transition);
  }

  .neo-spectrum-analyzer {
    position: absolute;
    bottom: 3px;
    right: 4px;
    height: 6px;
    display: flex;
    align-items: flex-end;
    gap: 1px;
    opacity: 0;
    transition: opacity var(--toggle-transition);
  }

  .neo-spectrum-bar {
    width: 1.5px;
    height: 2px;
    background-color: var(--toggle-on-color);
    opacity: 0.8;
  }

  .neo-track-highlight {
    position: absolute;
    inset: 1px;
    border-radius: calc(var(--toggle-height) / 2);
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0));
    opacity: 0;
    transition: all var(--toggle-transition);
  }

  /* Thumb */
  .neo-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform-style: preserve-3d;
    transition: transform var(--toggle-transition);
    z-index: 1;
  }

  .neo-thumb-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    background: var(--toggle-off-color);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    transition: all var(--toggle-transition);
  }

  .neo-thumb-core {
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    transition: all var(--toggle-transition);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .neo-thumb-icon {
    position: relative;
    width: 6px;
    height: 6px;
    transition: all var(--toggle-transition);
  }

  .neo-thumb-wave {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 1.5px;
    background: var(--toggle-off-color);
    transform: translate(-50%, -50%);
    transition: all var(--toggle-transition);
  }

  .neo-thumb-pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid var(--toggle-off-color);
    transform: scale(0);
    opacity: 0;
    transition: all var(--toggle-transition);
  }

  .neo-gesture-area {
    position: absolute;
    inset: -6px;
    z-index: 0;
  }

  .neo-interaction-feedback {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .neo-ripple {
    position: absolute;
    top: 50%;
    left: 30%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, var(--toggle-on-color) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.4s ease-out;
  }

  .neo-progress-arc {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px solid transparent;
    border-top-color: var(--toggle-on-color);
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.5s ease;
  }

  .neo-status { display: none; }

  /* ON state */
  .neo-toggle-input:checked + .neo-toggle .neo-thumb {
    transform: translateX(calc(var(--toggle-width) - 20px));
  }

  .neo-toggle-input:checked + .neo-toggle .neo-thumb-ring {
    background-color: var(--toggle-on-color);
    border-color: rgba(34,197,94,0.3);
    box-shadow: 0 0 8px rgba(34,197,94,0.55);
  }

  .neo-toggle-input:checked + .neo-toggle .neo-thumb-wave {
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid #fff;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-thumb-pulse {
    transform: scale(1.2);
    opacity: 0.3;
    animation: neo-pulse 1.5s infinite;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-track-highlight {
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.2));
    opacity: 1;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-grid-layer {
    opacity: 1;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-analyzer {
    opacity: 1;
  }

  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-bar:nth-child(1) { animation: neo-spectrum 0.9s infinite; }
  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-bar:nth-child(2) { animation: neo-spectrum 0.8s 0.1s infinite; }
  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-bar:nth-child(3) { animation: neo-spectrum 1.1s 0.2s infinite; }
  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-bar:nth-child(4) { animation: neo-spectrum 0.7s 0.1s infinite; }
  .neo-toggle-input:checked + .neo-toggle .neo-spectrum-bar:nth-child(5) { animation: neo-spectrum 0.9s 0.15s infinite; }

  /* Hover */
  .neo-toggle:hover .neo-thumb-ring {
    transform: scale(1.05);
  }

  @keyframes neo-pulse {
    0%   { transform: scale(1);   opacity: 0.5; }
    50%  { transform: scale(1.5); opacity: 0.2; }
    100% { transform: scale(1);   opacity: 0.5; }
  }

  @keyframes neo-spectrum {
    0%   { height: 2px; }
    50%  { height: 5px; }
    100% { height: 2px; }
  }

  /* Light mode overrides */
  html.light & .neo-toggle-container {
    --toggle-bg: #e5e7eb;
    --toggle-off-color: #9ca3af;
  }

  html.light & .neo-track {
    box-shadow:
      0 1px 4px rgba(0,0,0,0.12),
      inset 0 0 0 1px rgba(0,0,0,0.08);
  }

  html.light & .neo-background-layer {
    background: #e5e7eb;
    background-image: linear-gradient(
      -45deg,
      rgba(200,205,210,0.6) 0%,
      rgba(220,225,230,0.3) 50%,
      rgba(200,205,210,0.6) 100%
    );
  }

  html.light & .neo-thumb-ring {
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  }
`;

export default function NeoSwitch({ checked, onChange }) {
  const uid = useId();
  return (
    <StyledWrapper>
      <div className="neo-toggle-container">
        <input
          className="neo-toggle-input"
          id={uid}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label className="neo-toggle" htmlFor={uid}>
          <div className="neo-track">
            <div className="neo-background-layer" />
            <div className="neo-grid-layer" />
            <div className="neo-spectrum-analyzer">
              <div className="neo-spectrum-bar" />
              <div className="neo-spectrum-bar" />
              <div className="neo-spectrum-bar" />
              <div className="neo-spectrum-bar" />
              <div className="neo-spectrum-bar" />
            </div>
            <div className="neo-track-highlight" />
          </div>
          <div className="neo-thumb">
            <div className="neo-thumb-ring" />
            <div className="neo-thumb-core">
              <div className="neo-thumb-icon">
                <div className="neo-thumb-wave" />
                <div className="neo-thumb-pulse" />
              </div>
            </div>
          </div>
          <div className="neo-gesture-area" />
          <div className="neo-interaction-feedback">
            <div className="neo-ripple" />
            <div className="neo-progress-arc" />
          </div>
          <div className="neo-status" />
        </label>
      </div>
    </StyledWrapper>
  );
}
