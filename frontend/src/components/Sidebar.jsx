import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import VerfAILogo from './VerfAILogo';

/* Tile width must match background-size so the loop is seamless */
const TILE = 280;

const shineLoop = keyframes`
  from { background-position: 0 center; }
  to   { background-position: ${TILE}px center; }
`;

const ShineWordmark = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  overflow: hidden;

  .shine-name {
    font-family: var(--f-heading);
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.01em;
    white-space: nowrap;
    line-height: 1;
    /* Start and end at identical dim color → tiles seamlessly */
    background: linear-gradient(
      to right,
      #4b5563   0%,
      #9aa3ae  18%,
      #e2e8f0  32%,
      #ffffff  40%,
      #22c55e  48%,
      #ffffff  56%,
      #9aa3ae  70%,
      #4b5563 100%
    );
    background-size: ${TILE}px auto;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shineLoop} 2.8s linear infinite;
  }

  .shine-sub {
    font-family: var(--f-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    white-space: nowrap;
    text-transform: uppercase;
    background: linear-gradient(
      to right,
      #374151   0%,
      #6b7280  18%,
      #c8d0da  32%,
      #e2e8f0  40%,
      #ffffff  48%,
      #c8d0da  56%,
      #6b7280  70%,
      #374151 100%
    );
    background-size: ${TILE}px auto;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shineLoop} 2.8s 0.7s linear infinite;
  }

  /* Light mode */
  html.light & .shine-name {
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
    background-size: ${TILE}px auto;
    background-repeat: repeat;
    -webkit-background-clip: text;
    background-clip: text;
    animation: ${shineLoop} 2.8s linear infinite;
  }

  html.light & .shine-sub {
    background: linear-gradient(
      to right,
      #64748b   0%,
      #334155  18%,
      #1e293b  32%,
      #0f172a  40%,
      #1e293b  56%,
      #334155  70%,
      #64748b 100%
    );
    background-size: ${TILE}px auto;
    background-repeat: repeat;
    -webkit-background-clip: text;
    background-clip: text;
    animation: ${shineLoop} 2.8s 0.7s linear infinite;
  }
`;

const IC = {
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Corner scan brackets */}
      <path d="M2 5 L2 2.5 L4.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.5 2.5 L14 2.5 L14 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      {/* V-beam — scan funnel converging to verify point */}
      <path d="M2.5 3 L8 12.5 L13.5 3" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Scan line 1 */}
      <line x1="4.6" y1="6.8" x2="11.4" y2="6.8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.7"/>
      {/* Scan line 2 */}
      <line x1="5.9" y1="9.6" x2="10.1" y2="9.6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.45"/>
      {/* Focal verify dot */}
      <circle cx="8" cy="12.5" r="1.25" fill="currentColor"/>
    </svg>
  ),
  Dashboard: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  Analyze: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Investigations: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Reports: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  Settings: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

const NAV = [
  { id: 'dashboard',      label: 'Dashboard',      Icon: IC.Dashboard },
  { id: 'analyze',        label: 'Analyze',        Icon: IC.Analyze },
  { id: 'investigations', label: 'Investigations', Icon: IC.Investigations },
  { id: 'reports',        label: 'Reports',        Icon: IC.Reports },
  { id: 'settings',       label: 'Settings',       Icon: IC.Settings },
];

const STATUS = [
  { label: 'API Gateway', ok: true },
  { label: 'ML Pipeline', ok: true },
  { label: 'Database',    ok: true },
];

/* ── Glider nav ── */
const GliderNav = styled.nav`
  .radio-container {
    --accent: var(--c-accent);
    --accent-glow: rgba(34, 197, 94, 0.12);
    --total-radio: ${p => p.$count};

    display: flex;
    flex-direction: column;
    position: relative;
    padding-left: 0;
  }

  .radio-container input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  /* Left glider track */
  .radio-container .glider-container {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(
      0deg,
      rgba(0,0,0,0) 0%,
      rgba(20,24,28,1) 50%,
      rgba(0,0,0,0) 100%
    );
    width: 1px;
    z-index: 0;
  }

  .radio-container .glider-container .glider {
    position: relative;
    height: calc(100% / var(--total-radio));
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(0,0,0,0) 0%,
      var(--accent) 50%,
      rgba(0,0,0,0) 100%
    );
    transition: transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56);
    transform: translateY(calc(${p => p.$activeIdx} * 100%));
  }

  /* Glowing bloom to the right */
  .radio-container .glider-container .glider::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 180px;
    background: linear-gradient(
      90deg,
      var(--accent-glow) 0%,
      rgba(0,0,0,0) 100%
    );
    pointer-events: none;
  }

  /* Bright centre dot on the track */
  .radio-container .glider-container .glider::before {
    content: "";
    position: absolute;
    height: 50%;
    width: 200%;
    top: 50%;
    transform: translateY(-50%);
    background: var(--accent);
    filter: blur(8px);
    opacity: 0.5;
  }

  /* Nav item label button */
  .radio-container label {
    display: flex;
    align-items: center;
    gap: 11px;
    cursor: pointer;
    padding: 11px 16px 11px 20px;
    position: relative;
    color: var(--c-muted);
    font-family: var(--f-ui);
    font-size: 13px;
    font-weight: 400;
    transition: color 0.25s ease, background-color 0.2s ease;
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    z-index: 1;
    user-select: none;
    white-space: nowrap;
  }

  .radio-container label:hover {
    color: var(--c-text);
    background-color: rgba(255,255,255,0.03);
  }

  .radio-container label .nav-icon {
    flex-shrink: 0;
    transition: color 0.25s ease;
    color: var(--c-muted);
  }

  /* Active state — driven by JS via data attribute on container */
  .radio-container input:checked + label {
    color: var(--accent);
    font-weight: 500;
  }

  .radio-container input:checked + label .nav-icon {
    color: var(--accent);
  }
`;

/* Collapsed icon-only nav */
const CollapsedNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 0;
  position: relative;
`;

function Tooltip({ label, show }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 'calc(100% + 10px)',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'var(--c-elevated)',
        border: '1px solid var(--c-border)',
        color: 'var(--c-text)',
        fontSize: '12px',
        padding: '4px 10px',
        borderRadius: 'var(--radius-sm)',
        whiteSpace: 'nowrap',
        boxShadow: 'var(--shadow)',
        fontFamily: 'var(--f-ui)',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      {label}
    </div>
  );
}

function CollapsedNavItem({ item, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onClick}
        style={{
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: active ? 'var(--c-elevated)' : 'transparent',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          color: active ? 'var(--c-accent)' : 'var(--c-muted)',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--c-text)'; }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--c-muted)'; }}
      >
        <item.Icon />
      </button>
      <Tooltip label={item.label} show={hovered} />
    </div>
  );
}

export default function Sidebar({ activeNav, onNavClick, collapsed, onToggleCollapse }) {
  const activeIdx = NAV.findIndex(n => n.id === activeNav);

  return (
    <aside
      style={{
        width: collapsed ? '56px' : '280px',
        flexShrink: 0,
        height: '100%',
        backgroundColor: 'var(--c-surface)',
        borderRight: '1px solid var(--c-border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: collapsed ? 'row' : 'column',
          alignItems: 'center',
          gap: collapsed ? 0 : '14px',
          justifyContent: 'center',
          padding: collapsed ? '20px 0' : '28px 16px 22px',
          borderBottom: '1px solid var(--c-border)',
          transition: 'all 0.25s',
          overflow: 'hidden',
        }}
      >
        {/* Badge */}
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: 'var(--c-accent)',
            color: 'var(--logo-icon-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 18px var(--logo-glow)',
          }}
        >
          <VerfAILogo size={30} />
        </div>

        {!collapsed && (
          <ShineWordmark>
            <span className="shine-name">VerifAI</span>
            <span className="shine-sub">Media Forensics</span>
          </ShineWordmark>
        )}
      </div>

      {/* Navigation */}
      {collapsed ? (
        <CollapsedNav style={{ flex: 1, paddingTop: '16px' }}>
          {NAV.map(item => (
            <CollapsedNavItem
              key={item.id}
              item={item}
              active={activeNav === item.id}
              onClick={() => onNavClick(item.id)}
            />
          ))}
        </CollapsedNav>
      ) : (
        <GliderNav $activeIdx={Math.max(0, activeIdx)} $count={NAV.length} style={{ flex: 1, paddingTop: '16px', paddingBottom: '8px' }}>
          <div className="radio-container">
            {NAV.map((item, i) => (
              <span key={item.id}>
                <input
                  type="radio"
                  name="sidebar-nav"
                  id={`nav-${item.id}`}
                  checked={activeNav === item.id}
                  onChange={() => onNavClick(item.id)}
                />
                <label htmlFor={`nav-${item.id}`} onClick={() => onNavClick(item.id)}>
                  <span className="nav-icon"><item.Icon /></span>
                  {item.label}
                </label>
              </span>
            ))}
            <div className="glider-container">
              <div className="glider" />
            </div>
          </div>
        </GliderNav>
      )}

      {/* System status */}
      {!collapsed && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--c-border)' }}>
          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '9px',
              color: 'var(--c-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            System Status
          </div>
          {STATUS.map(({ label, ok }) => (
            <div
              key={label}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '7px' }}
            >
              <span style={{ fontSize: '12px', color: 'var(--c-muted)', fontFamily: 'var(--f-ui)' }}>
                {label}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div
                  className="anim-pulse"
                  style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: ok ? 'var(--c-success)' : 'var(--c-danger)' }}
                />
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '10px', color: ok ? 'var(--c-success)' : 'var(--c-danger)' }}>
                  {ok ? 'Online' : 'Error'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {collapsed && (
        <div style={{ padding: '16px 0', borderTop: '1px solid var(--c-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          {STATUS.map(({ label, ok }) => (
            <div
              key={label}
              className="anim-pulse"
              style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: ok ? 'var(--c-success)' : 'var(--c-danger)' }}
            />
          ))}
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        style={{
          width: '100%',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: '8px',
          backgroundColor: 'transparent',
          border: 'none',
          borderTop: '1px solid var(--c-border)',
          color: 'var(--c-muted)',
          cursor: 'pointer',
          fontSize: '11px',
          fontFamily: 'var(--f-ui)',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}
      >
        {collapsed ? <IC.ChevronRight /> : <><IC.ChevronLeft /><span>Collapse</span></>}
      </button>
    </aside>
  );
}
