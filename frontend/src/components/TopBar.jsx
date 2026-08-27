import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';
import ThemeSwitch from './ThemeSwitch';

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function TopBar({ title, navigate, onLogout }) {
  const { dark, toggle } = useTheme();
  const [search, setSearch] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header
      style={{
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '0 24px',
        backgroundColor: 'var(--c-surface)',
        borderBottom: '1px solid var(--c-border)',
        flexShrink: 0,
      }}
    >
      {/* Page title — left slot */}
      <h1
        style={{
          fontFamily: 'var(--f-heading)',
          fontSize: '15px',
          fontWeight: '600',
          color: 'var(--c-text)',
          whiteSpace: 'nowrap',
          flex: 1,
        }}
      >
        {title}
      </h1>

      {/* Search — centre slot */}
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />

      {/* Right spacer — mirrors left title to keep search centred */}
      <div style={{ flex: 1 }} />

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(n => !n)}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid transparent',
              backgroundColor: 'transparent',
              color: 'var(--c-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--c-elevated)'; e.currentTarget.style.color = 'var(--c-text)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--c-muted)'; }}
          >
            <BellIcon />
            <div style={{ position: 'absolute', top: '7px', right: '7px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--c-danger)', border: '1px solid var(--c-surface)' }} />
          </button>

          {notifOpen && (
            <div
              className="anim-fade-up"
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                right: 0,
                width: '280px',
                backgroundColor: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                zIndex: 100,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--c-border)', fontSize: '12px', fontWeight: '600', color: 'var(--c-text)', fontFamily: 'var(--f-ui)' }}>
                Notifications
              </div>
              {[
                { text: 'INV-2026-0891 analysis complete', time: '2m ago', dot: 'var(--c-success)' },
                { text: 'ML model updated to v2.4.1', time: '1h ago', dot: 'var(--c-warning)' },
                { text: 'New investigation submitted', time: '3h ago', dot: 'var(--c-info)' },
              ].map((n, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    padding: '10px 14px',
                    borderBottom: i < 2 ? '1px solid var(--c-border)' : 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--c-elevated)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: n.dot, marginTop: '5px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--c-text)', marginBottom: '2px' }}>{n.text}</div>
                    <div style={{ fontSize: '11px', color: 'var(--c-muted)', fontFamily: 'var(--f-mono)' }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <ThemeSwitch />

        {/* User avatar + profile dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileOpen(o => !o)}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: profileOpen ? 'var(--c-accent, #22C55E)' : 'var(--c-elevated)',
              border: profileOpen ? '1.5px solid var(--c-accent, #22C55E)' : '1px solid var(--c-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: '700',
              color: profileOpen ? '#fff' : 'var(--c-muted)',
              cursor: 'pointer',
              marginLeft: '4px',
              fontFamily: 'var(--f-ui)',
              transition: 'all 0.15s',
            }}
          >
            JS
          </button>

          {profileOpen && (
            <div
              className="anim-fade-up"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '220px',
                backgroundColor: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                zIndex: 100,
                overflow: 'hidden',
              }}
            >
              {/* User info */}
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--c-border)' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#fff',
                  fontFamily: 'var(--f-ui)',
                  marginBottom: '10px',
                }}>JS</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--c-text)', fontFamily: 'var(--f-ui)', lineHeight: 1.3 }}>
                  John Smith
                </div>
                <div style={{ fontSize: '11px', color: 'var(--c-muted)', fontFamily: 'var(--f-mono)', marginTop: '2px' }}>
                  john.smith@verifai.io
                </div>
                <div style={{
                  marginTop: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.25)',
                }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                  <span style={{ fontSize: '10px', fontWeight: '600', color: '#22C55E', fontFamily: 'var(--f-mono)', letterSpacing: '0.05em' }}>
                    ANALYST
                  </span>
                </div>
              </div>

              {/* Menu items */}
              {[
                { label: 'Account Settings', icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' },
                { label: 'API Keys', icon: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4' },
              ].map((item) => (
                <button
                  key={item.label}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '9px 16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--c-text)',
                    fontSize: '12px',
                    fontFamily: 'var(--f-ui)',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--c-elevated)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                    <path d={item.icon} />
                  </svg>
                  {item.label}
                </button>
              ))}

              {/* Divider + Logout */}
              <div style={{ borderTop: '1px solid var(--c-border)', padding: '6px' }}>
                <button
                  onClick={() => { setProfileOpen(false); onLogout && onLogout(); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    background: 'none',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: 'var(--c-danger, #ef4444)',
                    fontSize: '12px',
                    fontFamily: 'var(--f-ui)',
                    fontWeight: '500',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
