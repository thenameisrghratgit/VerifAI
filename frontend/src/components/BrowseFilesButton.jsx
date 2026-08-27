import styled from 'styled-components';

const COLORS = {
  video: {
    main:       '#22c55e',
    border:     'rgba(34, 197, 94, 0.5)',
    borderHov:  'rgba(34, 197, 94, 0.8)',
    glow:       'rgba(34, 197, 94, 0.22)',
    shine:      '#22c55e',
    shineLight: '#38ef7d',
    /* light mode */
    lBorder:    'rgba(22, 76, 167, 0.5)',
    lBorderHov: 'rgba(22, 76, 167, 0.8)',
    lGlow:      'rgba(22, 76, 167, 0.14)',
    lText:      '#164ca7',
  },
  image: {
    main:       '#a855f7',
    border:     'rgba(168, 85, 247, 0.5)',
    borderHov:  'rgba(168, 85, 247, 0.8)',
    glow:       'rgba(168, 85, 247, 0.22)',
    shine:      '#a855f7',
    shineLight: '#c084fc',
    lBorder:    'rgba(168, 85, 247, 0.5)',
    lBorderHov: 'rgba(168, 85, 247, 0.8)',
    lGlow:      'rgba(168, 85, 247, 0.14)',
    lText:      '#7c3aed',
  },
  audio: {
    main:       '#3b82f6',
    border:     'rgba(59, 130, 246, 0.5)',
    borderHov:  'rgba(59, 130, 246, 0.8)',
    glow:       'rgba(59, 130, 246, 0.22)',
    shine:      '#3b82f6',
    shineLight: '#60a5fa',
    lBorder:    'rgba(59, 130, 246, 0.5)',
    lBorderHov: 'rgba(59, 130, 246, 0.8)',
    lGlow:      'rgba(59, 130, 246, 0.14)',
    lText:      '#1d4ed8',
  },
  text: {
    main:       '#f59e0b',
    border:     'rgba(245, 158, 11, 0.5)',
    borderHov:  'rgba(245, 158, 11, 0.8)',
    glow:       'rgba(245, 158, 11, 0.22)',
    shine:      '#f59e0b',
    shineLight: '#fcd34d',
    lBorder:    'rgba(245, 158, 11, 0.5)',
    lBorderHov: 'rgba(245, 158, 11, 0.8)',
    lGlow:      'rgba(245, 158, 11, 0.14)',
    lText:      '#b45309',
  },
};

const StyledWrapper = styled.div`
  display: inline-block;

  .btn-shine {
    position: relative;
    margin: 0;
    padding: 8px 20px;
    outline: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    font-family: var(--f-ui, 'Manrope', sans-serif);
    z-index: 0;
    overflow: hidden;
    background-color: #0e1318;
    border: 1px solid ${p => p.$c.border};
    color: ${p => p.$c.main};
    transition:
      border-color 0.35s ease,
      box-shadow   0.35s ease,
      color        0.35s ease;
  }

  .btn-shine span {
    z-index: 20;
    position: relative;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    color: ${p => p.$c.main};
    transition: color 0.35s ease;
  }

  /* Shine stripe */
  .btn-shine:after {
    background: ${p => p.$c.shine};
    content: "";
    height: 155px;
    left: -75px;
    opacity: 0.18;
    position: absolute;
    top: -50px;
    transform: rotate(35deg);
    transition: left 550ms cubic-bezier(0.19, 1, 0.22, 1),
                background 0.35s ease;
    width: 50px;
    z-index: -10;
  }

  .btn-shine:hover {
    animation: browse-rotate 0.7s ease-in-out both;
    border-color: ${p => p.$c.borderHov};
    box-shadow: 0 0 14px ${p => p.$c.glow};
  }

  .btn-shine:hover span {
    animation: browse-storm 0.7s ease-in-out both;
    animation-delay: 0.06s;
  }

  .btn-shine:hover:after {
    left: 120%;
  }

  /* Light mode */
  html.light & .btn-shine {
    background-color: #ffffff;
    border-color: ${p => p.$c.lBorder};
    color: ${p => p.$c.lText};
  }

  html.light & .btn-shine span {
    color: ${p => p.$c.lText};
  }

  html.light & .btn-shine:after {
    background: ${p => p.$c.shineLight};
    opacity: 0.4;
  }

  html.light & .btn-shine:hover {
    border-color: ${p => p.$c.lBorderHov};
    box-shadow: 0 0 14px ${p => p.$c.lGlow};
  }

  @keyframes browse-rotate {
    0%   { transform: rotate(0deg)  translate3d(0, 0, 0); }
    25%  { transform: rotate(3deg)  translate3d(0, 0, 0); }
    50%  { transform: rotate(-3deg) translate3d(0, 0, 0); }
    75%  { transform: rotate(1deg)  translate3d(0, 0, 0); }
    100% { transform: rotate(0deg)  translate3d(0, 0, 0); }
  }

  @keyframes browse-storm {
    0%   { transform: translate3d(0,    0, 0) translateZ(0); }
    25%  { transform: translate3d(4px,  0, 0) translateZ(0); }
    50%  { transform: translate3d(-3px, 0, 0) translateZ(0); }
    75%  { transform: translate3d(2px,  0, 0) translateZ(0); }
    100% { transform: translate3d(0,    0, 0) translateZ(0); }
  }
`;

export default function BrowseFilesButton({ type = 'video' }) {
  const c = COLORS[type] ?? COLORS.video;
  return (
    <StyledWrapper $c={c}>
      <button className="btn-shine">
        <span>Browse Files</span>
      </button>
    </StyledWrapper>
  );
}
