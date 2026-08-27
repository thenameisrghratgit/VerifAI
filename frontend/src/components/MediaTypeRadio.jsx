import styled from 'styled-components';

const StyledWrapper = styled.div`
  .glass-radio-group {
    display: flex;
    position: relative;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 1rem;
    backdrop-filter: blur(12px);
    box-shadow:
      inset 1px 1px 4px rgba(255, 255, 255, 0.08),
      inset -1px -1px 6px rgba(0, 0, 0, 0.35),
      0 4px 12px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    width: fit-content;
  }

  .glass-radio-group input {
    display: none;
  }

  .glass-radio-group label {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-width: 90px;
    font-size: 13px;
    padding: 0.65rem 1.3rem;
    cursor: pointer;
    font-weight: 600;
    font-family: 'Manrope', sans-serif;
    letter-spacing: 0.2px;
    color: #9AA3AE;
    position: relative;
    z-index: 2;
    transition: color 0.3s ease-in-out;
    white-space: nowrap;
  }

  .glass-radio-group label:hover {
    color: #F2F4F7;
  }

  .glass-radio-group input:checked + label {
    color: #fff;
  }

  .glass-glider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: calc(100% / 4);
    border-radius: 1rem;
    z-index: 1;
    transition:
      transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56),
      background 0.4s ease-in-out,
      box-shadow 0.4s ease-in-out;
  }

  /* Video — green */
  #type-video:checked ~ .glass-glider {
    transform: translateX(0%);
    background: linear-gradient(135deg, rgba(34,197,94,0.35), rgba(34,197,94,0.7));
    box-shadow:
      0 0 18px rgba(34, 197, 94, 0.45),
      inset 0 0 10px rgba(134, 239, 172, 0.2);
  }

  /* Image — purple */
  #type-image:checked ~ .glass-glider {
    transform: translateX(100%);
    background: linear-gradient(135deg, rgba(168,85,247,0.35), rgba(168,85,247,0.7));
    box-shadow:
      0 0 18px rgba(168, 85, 247, 0.45),
      inset 0 0 10px rgba(216, 180, 254, 0.2);
  }

  /* Audio — blue */
  #type-audio:checked ~ .glass-glider {
    transform: translateX(200%);
    background: linear-gradient(135deg, rgba(59,130,246,0.35), rgba(59,130,246,0.7));
    box-shadow:
      0 0 18px rgba(59, 130, 246, 0.45),
      inset 0 0 10px rgba(147, 197, 253, 0.2);
  }

  /* Text — amber */
  #type-text:checked ~ .glass-glider {
    transform: translateX(300%);
    background: linear-gradient(135deg, rgba(245,158,11,0.35), rgba(245,158,11,0.7));
    box-shadow:
      0 0 18px rgba(245, 158, 11, 0.45),
      inset 0 0 10px rgba(253, 230, 138, 0.2);
  }

  /* Light mode overrides */
  html.light & .glass-radio-group {
    background: rgba(0, 0, 0, 0.04);
    box-shadow:
      inset 1px 1px 3px rgba(255,255,255,0.8),
      inset -1px -1px 4px rgba(0,0,0,0.1),
      0 2px 8px rgba(0,0,0,0.08);
  }

  html.light & .glass-radio-group label {
    color: #374151;
    font-weight: 700;
  }

  html.light & .glass-radio-group label:hover {
    color: #111827;
  }

  html.light & .glass-radio-group input:checked + label {
    color: #fff;
    font-weight: 700;
  }
`;

const ICONS = {
  video: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  image: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  audio: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  text: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
};

export default function MediaTypeRadio({ value, onChange }) {
  return (
    <StyledWrapper>
      <div className="glass-radio-group">
        <input type="radio" name="media-type" id="type-video" checked={value === 'video'} onChange={() => onChange('video')} />
        <label htmlFor="type-video">{ICONS.video} Video</label>

        <input type="radio" name="media-type" id="type-image" checked={value === 'image'} onChange={() => onChange('image')} />
        <label htmlFor="type-image">{ICONS.image} Image</label>

        <input type="radio" name="media-type" id="type-audio" checked={value === 'audio'} onChange={() => onChange('audio')} />
        <label htmlFor="type-audio">{ICONS.audio} Audio</label>

        <input type="radio" name="media-type" id="type-text" checked={value === 'text'} onChange={() => onChange('text')} />
        <label htmlFor="type-text">{ICONS.text} Text</label>

        <div className="glass-glider" />
      </div>
    </StyledWrapper>
  );
}
