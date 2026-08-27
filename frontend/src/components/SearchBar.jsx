import styled from 'styled-components';

const StyledWrapper = styled.div`
  .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    width: 320px;
  }

  .input {
    font-family: 'Manrope', sans-serif;
    width: 100%;
    height: 38px;
    padding-left: 2.5rem;
    box-shadow: 0 0 0 1.5px #252A33, 0 0 25px -17px #000;
    border: 0;
    border-radius: 8px;
    background-color: #171C22;
    outline: none;
    color: #F2F4F7;
    font-size: 12px;
    transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: text;
    z-index: 0;
  }

  .input::placeholder {
    color: #9AA3AE;
  }

  .input:hover {
    box-shadow: 0 0 0 2.5px #2f303d, 0px 0px 25px -15px #000;
  }

  .input:active {
    transform: scale(0.98);
  }

  .input:focus {
    box-shadow: 0 0 0 2px #22C55E55;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    fill: #9AA3AE;
    width: 14px;
    height: 14px;
    pointer-events: none;
    z-index: 1;
  }

  /* Light mode overrides */
  html.light & .input {
    background-color: #ffffff;
    box-shadow: 0 0 0 1.5px #d1d5db, 0 0 25px -17px rgba(0,0,0,0.08);
    color: #111827;
  }

  html.light & .input::placeholder {
    color: #9ca3af;
  }

  html.light & .input:hover {
    box-shadow: 0 0 0 2px #b0b7c3, 0px 0px 25px -15px rgba(0,0,0,0.06);
  }

  html.light & .input:focus {
    box-shadow: 0 0 0 2px #22C55E88;
  }

  html.light & .search-icon {
    fill: #9ca3af;
  }
`;

export default function SearchBar({ value, onChange }) {
  return (
    <StyledWrapper>
      <div className="group">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </g>
        </svg>
        <input
          id="query"
          className="input"
          type="search"
          placeholder="Search investigations, files…"
          name="searchbar"
          value={value}
          onChange={onChange}
        />
      </div>
    </StyledWrapper>
  );
}
