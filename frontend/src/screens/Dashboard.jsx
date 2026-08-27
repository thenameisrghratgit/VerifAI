import { useState } from 'react';
import NewAnalysisButton from '../components/NewAnalysisButton';

const INVESTIGATIONS = [
  { id: 'INV-2026-0891', file: 'press_conference_excerpt.mp4', type: 'Video', verdict: 'Likely AI', confidence: 87, date: 'Aug 27, 2026' },
];

function verdictBadge(v) {
  if (v === 'Likely AI') return <span className="badge badge-danger">Likely AI Generated</span>;
  if (v === 'Likely Authentic') return <span className="badge badge-success">Likely Authentic</span>;
  return <span className="badge badge-warning">Inconclusive</span>;
}

function typeBadge(t) {
  const styles = {
    Video: { backgroundColor: 'rgba(59,130,246,0.1)', color: 'var(--c-info)' },
    Image: { backgroundColor: 'rgba(239,68,68,0.08)', color: '#F87171' },
    Audio: { backgroundColor: 'rgba(34,197,94,0.08)', color: 'var(--c-success)' },
  };
  return (
    <span className="badge" style={styles[t] || {}}>
      {t}
    </span>
  );
}

const FILTERS = ['All', 'Image', 'Video', 'Audio', 'Likely AI', 'Likely Authentic', 'Inconclusive'];

export default function Dashboard({ navigate }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = INVESTIGATIONS.filter(inv => {
    const matchFilter =
      filter === 'All' ||
      inv.type === filter ||
      (filter === 'Likely AI' && inv.verdict === 'Likely AI') ||
      (filter === 'Likely Authentic' && inv.verdict === 'Likely Authentic') ||
      (filter === 'Inconclusive' && inv.verdict === 'Inconclusive');
    const matchSearch = !search || inv.file.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--c-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 40px' }}>

        {/* Hero */}
        <div style={{ marginBottom: '40px' }}>
          <h1
            style={{
              fontFamily: 'var(--f-heading)',
              fontSize: '28px',
              fontWeight: '700',
              color: 'var(--c-text)',
              marginBottom: '6px',
              lineHeight: '1.2',
            }}
          >
            Verify what you see.
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--c-muted)', marginBottom: '20px' }}>
            Analyze digital media for signs of synthetic manipulation.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <NewAnalysisButton onClick={() => navigate('analyze')} />
            <span style={{ fontSize: '12px', color: 'var(--c-muted)', fontFamily: 'var(--f-mono)' }}>
              Last updated · Aug 27, 2026 · 11:32 UTC
            </span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '36px' }}>
          {[
            { label: 'Files Analyzed',   value: '1',    delta: '+1 today',       deltaUp: true },
            { label: 'Likely AI',        value: '1',    delta: '100% of total',  deltaUp: false },
            { label: 'Likely Authentic', value: '0',    delta: '0% of total',    deltaUp: null },
            { label: 'Inconclusive',     value: '0',    delta: '0% of total',    deltaUp: null },
          ].map(stat => (
            <div
              key={stat.label}
              className="card"
              style={{ padding: '20px' }}
            >
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '9px',
                  color: 'var(--c-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '10px',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-heading)',
                  fontSize: '26px',
                  fontWeight: '700',
                  color: 'var(--c-text)',
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--f-mono)',
                  color: stat.deltaUp === true ? 'var(--c-success)' : stat.deltaUp === false ? 'var(--c-danger)' : 'var(--c-muted)',
                }}
              >
                {stat.deltaUp === true ? '↑ ' : stat.deltaUp === false ? '↓ ' : ''}{stat.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Investigations table */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2
              style={{
                fontFamily: 'var(--f-heading)',
                fontSize: '15px',
                fontWeight: '600',
                color: 'var(--c-text)',
              }}
            >
              Recent Investigations
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                className="input"
                style={{ width: '200px', fontSize: '12px', padding: '6px 10px' }}
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button
                className="btn btn-ghost"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                Export
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              marginBottom: '12px',
              padding: '4px',
              backgroundColor: 'var(--c-elevated)',
              borderRadius: 'var(--radius)',
              width: 'fit-content',
            }}
          >
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: filter === f ? 'var(--c-surface)' : 'transparent',
                  color: filter === f ? 'var(--c-text)' : 'var(--c-muted)',
                  fontWeight: filter === f ? '500' : '400',
                  fontFamily: 'var(--f-ui)',
                  transition: 'all 0.15s',
                  boxShadow: filter === f ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="card" style={{ overflow: 'hidden' }}>
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr 72px 140px 90px 100px',
                padding: '10px 16px',
                borderBottom: '1px solid var(--c-border)',
                backgroundColor: 'var(--c-elevated)',
                fontFamily: 'var(--f-mono)',
                fontSize: '9px',
                color: 'var(--c-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              <span>ID</span><span>File</span><span>Type</span>
              <span>Verdict</span><span>Confidence</span><span>Date</span>
            </div>

            {filtered.length === 0 && (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--c-muted)', fontSize: '13px' }}>
                No investigations match the current filters.
              </div>
            )}

            {filtered.map((inv, idx) => (
              <div
                key={inv.id}
                onClick={() => navigate('results')}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '150px 1fr 72px 140px 90px 100px',
                  padding: '12px 16px',
                  borderBottom: idx < filtered.length - 1 ? '1px solid var(--c-border)' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.1s',
                  alignItems: 'center',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--c-elevated)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-accent)' }}>
                  {inv.id}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--c-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '12px' }}>
                  {inv.file}
                </span>
                <span>{typeBadge(inv.type)}</span>
                <span>{verdictBadge(inv.verdict)}</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '12px', color: inv.confidence > 80 ? 'var(--c-text)' : 'var(--c-muted)' }}>
                  {inv.confidence}%
                </span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)' }}>
                  {inv.date}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--c-muted)', fontFamily: 'var(--f-mono)' }}>
            {filtered.length} of {INVESTIGATIONS.length} investigations shown
          </div>
        </div>
      </div>
    </div>
  );
}
