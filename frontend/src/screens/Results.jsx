import { useState } from 'react';

const R = 88;
const CIRC = 2 * Math.PI * R;
const SCORE = 0.87;
const OFFSET = CIRC * (1 - SCORE);

const EVIDENCE = [
  {
    id: 'facial',
    label: 'Facial Consistency',
    score: 94,
    severity: 'high',
    model: 'FaceNet v3.2',
    description: 'Landmark geometry deviates 2.8σ from natural distribution. Ear-to-nose ratio inconsistent with photographic faces at p < 0.01.',
  },
];

function severityColor(s) {
  if (s === 'high') return 'var(--c-danger)';
  if (s === 'medium') return 'var(--c-warning)';
  return 'var(--c-muted)';
}

function severityBg(s) {
  if (s === 'high') return 'var(--c-danger-bg)';
  if (s === 'medium') return 'var(--c-warning-bg)';
  return 'rgba(154,163,174,0.08)';
}

export default function Results({ navigate }) {
  const [tab, setTab] = useState('evidence');

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--c-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 40px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <button
            onClick={() => navigate('analyze')}
            style={{ fontSize: '12px', color: 'var(--c-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--f-ui)', padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}
          >
            ← New Analysis
          </button>
          <span style={{ color: 'var(--c-border)' }}>·</span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)' }}>INV-2026-0891</span>
          <span style={{ color: 'var(--c-border)' }}>·</span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)' }}>2026-08-27 11:32 UTC</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--f-heading)', fontSize: '22px', fontWeight: '700', color: 'var(--c-text)', marginBottom: '4px' }}>
              Analysis Report
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--c-muted)' }}>
              press_conference_excerpt.mp4 · 128.4 MB · 02:34 · 1920×1080
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-ghost" style={{ fontSize: '12px' }} onClick={() => navigate('video-forensics')}>
              Video Forensics
            </button>
            <button className="btn btn-ghost" style={{ fontSize: '12px' }}>
              Export PDF
            </button>
          </div>
        </div>

        {/* ── HERO VERDICT ── */}
        <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '36px', alignItems: 'center' }}>

            {/* Score ring */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(242,244,247,0.55)" style={{ flexShrink: 0 }}>
                  <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
                <span
                  className="ai-insights-shine"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '21px', fontWeight: '700', letterSpacing: '-0.01em' }}
                >
                  AI Insights
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(242,244,247,0.35)" style={{ flexShrink: 0 }}>
                  <path d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
              </div>
              <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Track */}
                <circle cx="100" cy="100" r={R} fill="none" stroke="var(--c-elevated)" strokeWidth="10" />
                {/* Score arc */}
                <circle
                  cx="100" cy="100" r={R}
                  fill="none"
                  stroke="var(--c-danger)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={OFFSET}
                  transform="rotate(-90 100 100)"
                  className="anim-ring"
                />
                {/* Score */}
                <text x="100" y="93" textAnchor="middle" fill="var(--c-danger)" fontSize="42" fontFamily="'Montserrat', sans-serif" fontWeight="700">
                  87
                </text>
                <text x="100" y="110" textAnchor="middle" fill="var(--c-danger)" fontSize="10" fontFamily="'Montserrat', sans-serif" fontWeight="500" opacity="0.8" letterSpacing="0.5">
                  percent
                </text>
                <text x="100" y="127" textAnchor="middle" fill="var(--c-muted)" fontSize="7.5" fontFamily="'Montserrat', sans-serif" fontWeight="600" letterSpacing="2">
                  AI LIKELIHOOD
                </text>
              </svg>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontStyle: 'italic', fontSize: '11px', color: 'var(--c-muted)', textAlign: 'center', marginTop: '-4px', letterSpacing: '0.01em' }}>
                Probabilistic estimate
              </div>
            </div>

            {/* Verdict block */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span className="badge badge-danger" style={{ fontSize: '11px', padding: '4px 10px', fontFamily: "'Montserrat', sans-serif", fontWeight: '600', letterSpacing: '0.01em' }}>
                  <div className="anim-pulse" style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--c-danger)' }} />
                  Likely AI Generated
                </span>
                <span style={{ fontSize: '11px', color: 'var(--c-muted)', fontFamily: "'Montserrat', sans-serif", fontStyle: 'italic' }}>
                  1/1 evidence vectors flagged · High
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--f-heading)',
                  fontSize: '22px',
                  fontWeight: '700',
                  color: 'var(--c-text)',
                  marginBottom: '10px',
                  lineHeight: '1.3',
                }}
              >
                Synthetic media likely detected
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--c-muted)', lineHeight: '1.65', maxWidth: '480px', marginBottom: '20px' }}>
                Multiple overlapping signals are consistent with AI-generated video synthesis.
                Facial geometry, temporal artifacts, and audio-visual sync all indicate
                possible StyleGAN3-class deepfake generation.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  backgroundColor: 'var(--c-elevated)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--c-border)',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--c-warning)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style={{ fontSize: '12px', color: 'var(--c-muted)', fontStyle: 'italic' }}>
                  Probabilistic assessment — not absolute proof of manipulation.
                </span>
              </div>

              {/* Key metrics */}
              <div style={{ display: 'flex', gap: '24px', marginTop: '20px' }}>
                {[
                  { label: 'Evidence vectors', value: '4 / 4' },
                  { label: 'Flagged frames', value: '387' },
                  { label: 'Analysis time', value: '11.4s' },
                  { label: 'Model', value: 'v2.4.1' },
                ].map((m, i) => (
                  <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    {i > 0 && <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--c-border)' }} />}
                    <div>
                      <div style={{ fontFamily: 'var(--f-mono)', fontSize: '10px', color: 'var(--c-muted)', marginBottom: '2px' }}>{m.label}</div>
                      <div style={{ fontFamily: 'var(--f-heading)', fontSize: '17px', fontWeight: '600', color: 'var(--c-text)' }}>{m.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal breakdown */}
            <div
              style={{
                width: '200px',
                padding: '16px',
                backgroundColor: 'var(--c-elevated)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--c-border)',
              }}
            >
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                Signal breakdown
              </div>
              {[
                { label: 'Visual', pct: 91, color: 'var(--c-danger)' },
                { label: 'Temporal', pct: 87, color: 'var(--c-danger)' },
                { label: 'Audio', pct: 76, color: 'var(--c-warning)' },
                { label: 'Metadata', pct: 61, color: 'var(--c-muted)' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--c-muted)' }}>{item.label}</span>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', fontWeight: '500', color: item.color }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: '3px', backgroundColor: 'var(--c-border)', borderRadius: '2px' }}>
                    <div style={{ height: '3px', backgroundColor: item.color, borderRadius: '2px', width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--c-border)', marginBottom: '20px' }}>
          {[
            { id: 'evidence', label: 'Evidence Detected' },
            { id: 'metadata', label: 'File Metadata' },
            { id: 'raw',      label: 'Raw Output' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '10px 20px',
                fontSize: '13px',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'transparent',
                color: tab === t.id ? 'var(--c-text)' : 'var(--c-muted)',
                borderBottom: `2px solid ${tab === t.id ? 'var(--c-accent)' : 'transparent'}`,
                marginBottom: '-1px',
                fontWeight: tab === t.id ? '500' : '400',
                fontFamily: 'var(--f-ui)',
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Evidence tab */}
        {tab === 'evidence' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {EVIDENCE.map(ev => (
              <EvidenceCard key={ev.id} ev={ev} />
            ))}
          </div>
        )}

        {/* Metadata tab */}
        {tab === 'metadata' && (
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48px' }}>
              {[
                { label: 'Filename',      value: 'press_conference_excerpt.mp4', flag: false },
                { label: 'File size',     value: '128,403,218 bytes',            flag: false },
                { label: 'Duration',      value: '00:02:34.471',                 flag: false },
                { label: 'Resolution',    value: '1920 × 1080',                  flag: false },
                { label: 'Frame rate',    value: '29.97 fps (VFR)',              flag: false },
                { label: 'Video codec',   value: 'H.264 / AVC Baseline',        flag: false },
                { label: 'Audio codec',   value: 'AAC · 48000 Hz · Stereo',     flag: false },
                { label: 'Avg bitrate',   value: '6,840 kbps',                   flag: false },
                { label: 'Created',       value: '2026-08-27T11:22:07Z',        flag: false },
                { label: 'Modified',      value: '2026-08-27T11:14:33Z',        flag: false },
                { label: 'Encoding tool', value: 'FFmpeg 6.0 (anomalous)',       flag: true },
                { label: 'GPS data',      value: 'Stripped',                     flag: true },
                { label: 'Camera',        value: 'Missing',                      flag: true },
                { label: 'SHA-256',       value: 'a4f2c8d1…3b1e9f72',           flag: false },
              ].map(({ label, value, flag }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--c-border)' }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: '10px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', paddingTop: '1px' }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: '12px', color: flag ? 'var(--c-danger)' : 'var(--c-text)', textAlign: 'right' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Raw tab */}
        {tab === 'raw' && (
          <div
            className="card"
            style={{
              padding: '20px',
              fontFamily: 'var(--f-mono)',
              fontSize: '11px',
              lineHeight: '1.8',
              color: 'var(--c-muted)',
              maxHeight: '420px',
              overflowY: 'auto',
              backgroundColor: 'var(--c-elevated)',
            }}
          >
            {[
              '{"analysis_id": "INV-2026-0891",',
              ' "timestamp": "2026-08-27T11:32:11Z",',
              ' "model_version": "2.4.1",',
              ' "verdict": "LIKELY_AI_GENERATED",',
              ' "confidence": 0.87,',
              ' "classification": "HIGH",',
              ' "evidence": [',
              '   {"type": "FACIAL_CONSISTENCY", "score": 0.94, "severity": "HIGH"},',
              '   {"type": "TEMPORAL_ARTIFACTS",  "score": 0.89, "severity": "HIGH"},',
              '   {"type": "AV_SYNC",             "score": 0.76, "severity": "MEDIUM"},',
              '   {"type": "METADATA_ANOMALY",     "score": 0.61, "severity": "LOW"}',
              ' ],',
              ' "disclaimer": "Probabilistic assessment. Not absolute proof.",',
              ' "frames_analyzed": 2312,',
              ' "flagged_frames": 387,',
              ' "processing_ms": 11423}',
            ].map((line, i) => (
              <div key={i} style={{ color: line.includes('"LIKELY_AI') || line.includes('"HIGH"') ? 'var(--c-danger)' : line.includes('"MEDIUM"') ? 'var(--c-warning)' : 'var(--c-muted)' }}>
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Footer nav */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--c-muted)' }}>Detailed forensics:</span>
          {[
            { label: 'Video Forensics', screen: 'video-forensics' },
            { label: 'Image Forensics', screen: 'image-forensics' },
            { label: 'Audio Forensics', screen: 'audio-forensics' },
          ].map(link => (
            <button
              key={link.label}
              onClick={() => navigate(link.screen)}
              className="btn btn-ghost"
              style={{ fontSize: '12px', padding: '6px 14px' }}
            >
              {link.label} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EvidenceCard({ ev }) {
  const color = severityColor(ev.severity);
  const bg = severityBg(ev.severity);

  return (
    <div
      className="card"
      style={{ padding: '20px', transition: 'border-color 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = color + '50')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--c-border)')}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color, flexShrink: 0, marginTop: '2px' }} />
          <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--c-text)', fontFamily: 'var(--f-ui)' }}>
            {ev.label}
          </span>
        </div>
        <span
          className="badge"
          style={{ backgroundColor: bg, color, fontSize: '9px', letterSpacing: '0.04em', marginLeft: '8px', flexShrink: 0 }}
        >
          {ev.severity.toUpperCase()}
        </span>
      </div>

      <p style={{ fontSize: '12px', color: 'var(--c-muted)', lineHeight: '1.6', marginBottom: '14px' }}>
        {ev.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Indicator score
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '12px', fontWeight: '500', color }}>
            {ev.score}%
          </span>
        </div>
      </div>

      <div style={{ height: '3px', backgroundColor: 'var(--c-border)', borderRadius: '2px', marginBottom: '10px' }}>
        <div style={{ height: '3px', backgroundColor: color, borderRadius: '2px', width: `${ev.score}%` }} />
      </div>

      <div style={{ fontFamily: 'var(--f-mono)', fontSize: '10px', color: 'var(--c-muted)' }}>
        Model: {ev.model}
      </div>
    </div>
  );
}
