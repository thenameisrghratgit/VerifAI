import { useState } from 'react';

const INVESTIGATIONS = [
  { id: 'INV-2026-0891', file: 'press_conference_excerpt.mp4', type: 'Video', verdict: 'Likely AI', confidence: 87, date: 'Aug 27, 2026', size: '128.4 MB', analyst: 'Auto' },
];

const TYPE_FILTERS  = ['All', 'Image', 'Video', 'Audio'];
const VERDICT_FILTERS = ['All Verdicts', 'Likely AI', 'Likely Authentic', 'Inconclusive'];

function verdictBadge(v) {
  if (v === 'Likely AI') return <span className="badge badge-danger">Likely AI Generated</span>;
  if (v === 'Likely Authentic') return <span className="badge badge-success">Likely Authentic</span>;
  return <span className="badge badge-warning">Inconclusive</span>;
}

function typeBadge(t) {
  const styles = {
    Video: { backgroundColor: 'var(--c-info-bg)',    color: 'var(--c-info)' },
    Image: { backgroundColor: 'var(--c-danger-bg)',  color: 'var(--c-danger)' },
    Audio: { backgroundColor: 'var(--c-success-bg)', color: 'var(--c-success)' },
  };
  return <span className="badge" style={styles[t] || {}}>{t}</span>;
}

export default function Investigations({ navigate }) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [verdictFilter, setVerdictFilter] = useState('All Verdicts');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filtered = INVESTIGATIONS.filter(inv => {
    const matchType = typeFilter === 'All' || inv.type === typeFilter;
    const matchVerdict = verdictFilter === 'All Verdicts' || inv.verdict === verdictFilter;
    const matchSearch = !search || inv.file.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    return matchType && matchVerdict && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'confidence') return b.confidence - a.confidence;
    if (sortBy === 'file') return a.file.localeCompare(b.file);
    return b.id.localeCompare(a.id);
  });

  const aiCount   = filtered.filter(i => i.verdict === 'Likely AI').length;
  const authCount = filtered.filter(i => i.verdict === 'Likely Authentic').length;
  const incCount  = filtered.filter(i => i.verdict === 'Inconclusive').length;

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--c-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--f-heading)', fontSize: '22px', fontWeight: '700', color: 'var(--c-text)', marginBottom: '4px' }}>
            Investigations
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--c-muted)' }}>
            All submitted media — filterable by type, verdict, and confidence.
          </p>
        </div>

        {/* Summary bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '28px' }}>
          {[
            { label: 'Total',            value: filtered.length, color: 'var(--c-text)',    bg: 'var(--c-surface)' },
            { label: 'Likely AI',        value: aiCount,         color: 'var(--c-danger)',  bg: 'var(--c-danger-bg)' },
            { label: 'Likely Authentic', value: authCount,       color: 'var(--c-success)', bg: 'var(--c-success-bg)' },
            { label: 'Inconclusive',     value: incCount,        color: 'var(--c-warning)', bg: 'var(--c-warning-bg)' },
          ].map(s => (
            <div key={s.label} style={{ padding: '16px 20px', borderRadius: 'var(--radius)', border: '1px solid var(--c-border)', backgroundColor: s.bg }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--f-heading)', fontSize: '24px', fontWeight: '700', color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
          {/* Type filter */}
          <div style={{ display: 'flex', gap: '3px', padding: '3px', backgroundColor: 'var(--c-elevated)', borderRadius: 'var(--radius)', flexShrink: 0 }}>
            {TYPE_FILTERS.map(f => (
              <button key={f} onClick={() => setTypeFilter(f)} style={{ padding: '5px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', cursor: 'pointer', border: 'none', fontFamily: 'var(--f-ui)', backgroundColor: typeFilter === f ? 'var(--c-surface)' : 'transparent', color: typeFilter === f ? 'var(--c-text)' : 'var(--c-muted)', fontWeight: typeFilter === f ? '500' : '400', transition: 'all 0.15s' }}>{f}</button>
            ))}
          </div>

          {/* Verdict filter */}
          <div style={{ display: 'flex', gap: '3px', padding: '3px', backgroundColor: 'var(--c-elevated)', borderRadius: 'var(--radius)', flexShrink: 0 }}>
            {VERDICT_FILTERS.map(f => (
              <button key={f} onClick={() => setVerdictFilter(f)} style={{ padding: '5px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', cursor: 'pointer', border: 'none', fontFamily: 'var(--f-ui)', backgroundColor: verdictFilter === f ? 'var(--c-surface)' : 'transparent', color: verdictFilter === f ? 'var(--c-text)' : 'var(--c-muted)', fontWeight: verdictFilter === f ? '500' : '400', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>{f}</button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Search */}
          <input className="input" style={{ width: '200px', fontSize: '12px', padding: '6px 10px' }} placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />

          {/* Sort */}
          <select className="input" style={{ fontSize: '12px', padding: '6px 10px', cursor: 'pointer' }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date">Sort: Newest</option>
            <option value="confidence">Sort: Confidence</option>
            <option value="file">Sort: File name</option>
          </select>

          <button className="btn btn-ghost" style={{ fontSize: '12px', padding: '6px 12px', flexShrink: 0 }}>Export</button>
        </div>

        {/* Table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 68px 148px 90px 100px 48px', padding: '10px 16px', borderBottom: '1px solid var(--c-border)', backgroundColor: 'var(--c-elevated)', fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <span>ID</span><span>File</span><span>Type</span><span>Verdict</span><span>Confidence</span><span>Date</span><span></span>
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--c-muted)', fontSize: '13px' }}>
              No investigations match the current filters.
            </div>
          )}

          {filtered.map((inv, idx) => (
            <div
              key={inv.id}
              onClick={() => navigate('results')}
              style={{ display: 'grid', gridTemplateColumns: '160px 1fr 68px 148px 90px 100px 48px', padding: '12px 16px', borderBottom: idx < filtered.length - 1 ? '1px solid var(--c-border)' : 'none', cursor: 'pointer', alignItems: 'center', transition: 'background-color 0.1s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--c-elevated)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-accent)' }}>{inv.id}</span>
              <div style={{ overflow: 'hidden', paddingRight: '12px' }}>
                <div style={{ fontSize: '13px', color: 'var(--c-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.file}</div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--f-mono)', color: 'var(--c-muted)', marginTop: '1px' }}>{inv.size}</div>
              </div>
              <span>{typeBadge(inv.type)}</span>
              <span>{verdictBadge(inv.verdict)}</span>
              <div>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '12px', color: inv.confidence > 85 ? 'var(--c-danger)' : inv.confidence > 70 ? 'var(--c-text)' : 'var(--c-muted)' }}>{inv.confidence}%</span>
                <div style={{ marginTop: '3px', height: '2px', borderRadius: '2px', backgroundColor: 'var(--c-border)', width: '60px' }}>
                  <div style={{ height: '2px', borderRadius: '2px', width: `${inv.confidence}%`, backgroundColor: inv.confidence > 80 ? 'var(--c-danger)' : inv.confidence > 60 ? 'var(--c-warning)' : 'var(--c-muted)' }}/>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)' }}>{inv.date}</span>
              <span style={{ fontSize: '14px', color: 'var(--c-muted)', textAlign: 'right' }}>›</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '10px', fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--c-muted)' }}>
          {filtered.length} of {INVESTIGATIONS.length} investigations shown
        </div>
      </div>
    </div>
  );
}
