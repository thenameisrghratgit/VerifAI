import { useState, useMemo } from 'react';

const pr = (seed) => { const x = Math.sin(seed + 13) * 10000; return x - Math.floor(x); };

const SUSPICIOUS_RANGES = [
  { startPct: 0.155, endPct: 0.235, label: 'Voice cloning artifact', time: '0:08–0:11', severity: 'critical', score: 0.923 },
  { startPct: 0.49,  endPct: 0.583, label: 'Spectral discontinuity', time: '0:24–0:28', severity: 'high',     score: 0.841 },
];

function scRaw(s) {
  return s === 'critical' ? '#EF4444' : s === 'high' ? '#F59E0B' : '#9AA3AE';
}

const BAR_COUNT = 200;

export default function AudioForensics({ navigate }) {
  const [playing, setPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(0.155);
  const [speed, setSpeed] = useState('1×');
  const [selected, setSelected] = useState(0);

  const waveform = useMemo(() => Array.from({ length: BAR_COUNT }, (_, i) => {
    const base = 0.15 + pr(i * 2.3) * 0.35 + 0.15 * Math.abs(Math.sin(i * 0.21));
    const pct = i / BAR_COUNT;
    const isSusp = SUSPICIOUS_RANGES.some(r => pct >= r.startPct && pct <= r.endPct);
    return Math.min(1, isSusp ? base * 2.1 : base);
  }), []);

  const spectrogramRows = useMemo(() => Array.from({ length: 12 }, (_, row) =>
    Array.from({ length: 80 }, (_, col) => {
      const suspCol = col / 80;
      const isSusp = SUSPICIOUS_RANGES.some(r => suspCol >= r.startPct && suspCol <= r.endPct);
      const vocBand = row >= 3 && row <= 8;
      const base = pr(row * 31 + col * 7) * 0.5;
      return Math.min(1, isSusp && vocBand ? base + 0.55 : base * 0.6);
    })), []);

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--c-bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '36px 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <button onClick={() => navigate('results')} style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--c-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}>← Results</button>
              <span style={{ color: 'var(--c-border)' }}>·</span>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)' }}>INV-2026-0890</span>
            </div>
            <h1 style={{ fontFamily: 'var(--f-heading)', fontSize: '22px', fontWeight: '700', color: 'var(--c-text)', marginBottom: '4px' }}>Audio Forensics</h1>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: '12px', color: 'var(--c-muted)' }}>statement_audio_full.wav · 48000 Hz · Stereo · 16-bit PCM · 00:48</div>
          </div>
          <span className="badge badge-warning" style={{ fontSize: '11px', padding: '6px 12px' }}>Voice Clone · 88.4% confidence</span>
        </div>

        {/* Waveform player */}
        <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--c-text)', marginBottom: '3px' }}>statement_audio_full.wav</div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--c-muted)' }}>PCM signed 16-bit LE · 48000 Hz · 2 channels · 00:48</div>
            </div>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)' }}>{Math.floor(playhead * 48)}s / 48s</span>
          </div>

          {/* Waveform SVG */}
          <div style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden', cursor: 'crosshair', marginBottom: '16px', backgroundColor: 'var(--c-elevated)', border: '1px solid var(--c-border)', height: '110px' }}
            onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setPlayhead((e.clientX - r.left) / r.width); }}>
            <svg width="100%" height="110" viewBox={`0 0 ${BAR_COUNT * 5} 110`} preserveAspectRatio="none">
              {SUSPICIOUS_RANGES.map((sr, i) => (
                <rect key={i} x={sr.startPct * BAR_COUNT * 5} y={0} width={(sr.endPct - sr.startPct) * BAR_COUNT * 5} height={110}
                  fill={sr.severity === 'critical' ? 'rgba(239,68,68,0.09)' : 'rgba(245,158,11,0.07)'} />
              ))}
              {waveform.map((amp, i) => {
                const barH = Math.max(4, amp * 90);
                const y = (110 - barH) / 2;
                const pct = i / BAR_COUNT;
                const isPast = pct < playhead;
                const susp = SUSPICIOUS_RANGES.find(r => pct >= r.startPct && pct <= r.endPct);
                const color = susp ? scRaw(susp.severity) : isPast ? '#22C55E' : '#374151';
                return <rect key={i} x={i * 5 + 1} y={y} width="3" height={barH} rx="1" fill={color} opacity={susp ? 0.9 : isPast ? 0.75 : 0.55} />;
              })}
              <line x1={playhead * BAR_COUNT * 5} y1={0} x2={playhead * BAR_COUNT * 5} y2={110} stroke="var(--c-text, #F2F4F7)" strokeWidth="1.5" opacity="0.65"/>
              {SUSPICIOUS_RANGES.map((sr, i) => (
                <text key={i} x={(sr.startPct + (sr.endPct - sr.startPct) / 2) * BAR_COUNT * 5} y="10" textAnchor="middle" fill={scRaw(sr.severity)} fontSize="8" opacity="0.8">▼</text>
              ))}
            </svg>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setPlaying(p => !p)} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--c-elevated)', border: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              {playing ? <svg width="10" height="10" viewBox="0 0 10 10" fill="var(--c-text)"><rect x="1" y="1" width="3" height="8"/><rect x="6" y="1" width="3" height="8"/></svg>
                : <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--c-text)"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
            </button>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)', display: 'flex', gap: '4px' }}>
              <span>{Math.floor(playhead * 48)}s</span><span>/</span><span>48s</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--c-muted)" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
              <div style={{ width: '64px', height: '2px', borderRadius: '2px', backgroundColor: 'var(--c-border)' }}><div style={{ height: '2px', width: '75%', borderRadius: '2px', backgroundColor: 'var(--c-accent)' }}/></div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
              {['0.5×','1×','1.5×','2×'].map(s => (
                <button key={s} onClick={() => setSpeed(s)} style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', backgroundColor: speed === s ? 'var(--c-elevated)' : 'transparent', color: speed === s ? 'var(--c-text)' : 'var(--c-muted)', border: `1px solid ${speed === s ? 'var(--c-border)' : 'transparent'}`, transition: 'all 0.15s' }}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 268px', gap: '24px' }}>
          {/* Spectrogram + frequency */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Spectrogram · 0–8 kHz</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '10px', color: 'var(--c-muted)' }}>STFT window: 2048 · hop: 512</span>
              </div>
              <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: 'var(--c-elevated)', border: '1px solid var(--c-border)' }}>
                <svg width="100%" height="120" viewBox={`0 0 ${80 * 8} ${12 * 10}`} preserveAspectRatio="none">
                  {spectrogramRows.map((row, r) => row.map((val, c) => {
                    const colPct = c / 80;
                    const susp = SUSPICIOUS_RANGES.some(sr => colPct >= sr.startPct && colPct <= sr.endPct);
                    const color = susp && r >= 3 && r <= 8 ? `rgba(239,68,68,${val})` : susp ? `rgba(245,158,11,${val * 0.7})` : `rgba(34,197,94,${val * 0.55})`;
                    return <rect key={`${r}-${c}`} x={c * 8} y={r * 10} width="7.5" height="9.5" fill={color}/>;
                  }))}
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 4px', fontFamily: 'var(--f-mono)', fontSize: '8px', color: 'var(--c-muted)', borderTop: '1px solid var(--c-border)' }}>
                  {['0s','12s','24s','36s','48s'].map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)' }}>
                <span>8 kHz</span><span>4 kHz</span><span>0 Hz</span>
              </div>
            </div>

            {/* Frequency band analysis */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Frequency Band Anomaly</div>
              {[
                { band: '0–300 Hz (Sub-bass)',          anomaly: false, pct: 18, note: 'Normal' },
                { band: '300 Hz–2 kHz (Vocal fundamental)', anomaly: true, pct: 89, note: '89% anomalous' },
                { band: '2–5 kHz (Vocal harmonics)',    anomaly: true, pct: 76, note: '76% anomalous' },
                { band: '5–8 kHz (Sibilance/air)',      anomaly: true, pct: 58, note: '58% anomalous' },
                { band: '8–20 kHz (Presence)',          anomaly: false, pct: 24, note: 'Normal' },
              ].map(item => (
                <div key={item.band} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '12px' }}>
                    <span style={{ color: item.anomaly ? 'var(--c-text)' : 'var(--c-muted)' }}>{item.band}</span>
                    <span style={{ fontFamily: 'var(--f-mono)', color: item.anomaly ? 'var(--c-danger)' : 'var(--c-success)' }}>{item.note}</span>
                  </div>
                  <div style={{ height: '3px', borderRadius: '2px', backgroundColor: 'var(--c-border)' }}>
                    <div style={{ height: '3px', borderRadius: '2px', width: `${item.pct}%`, backgroundColor: item.anomaly ? 'var(--c-danger)' : 'var(--c-success)' }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suspicious regions + technical */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Suspicious Regions</span>
            {SUSPICIOUS_RANGES.map((region, i) => (
              <button key={i} onClick={() => { setSelected(i); setPlayhead(region.startPct + 0.02); }} style={{ width: '100%', textAlign: 'left', borderRadius: 'var(--radius)', padding: '16px', backgroundColor: selected === i ? 'var(--c-elevated)' : 'var(--c-surface)', border: `1px solid ${selected === i ? `${scRaw(region.severity)}55` : 'var(--c-border)'}`, cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: '12px', fontWeight: '600', color: scRaw(region.severity) }}>{region.time}</span>
                  <span style={{ fontSize: '9px', fontFamily: 'var(--f-mono)', textTransform: 'capitalize', padding: '2px 6px', borderRadius: '3px', backgroundColor: `${scRaw(region.severity)}18`, color: scRaw(region.severity) }}>{region.severity}</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--c-text)', marginBottom: '8px' }}>{region.label}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--f-mono)', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--c-muted)' }}>Confidence</span>
                  <span style={{ color: scRaw(region.severity), fontWeight: '600' }}>{(region.score * 100).toFixed(1)}%</span>
                </div>
                <div style={{ height: '2px', borderRadius: '2px', backgroundColor: 'var(--c-border)' }}>
                  <div style={{ height: '2px', borderRadius: '2px', width: `${region.score * 100}%`, backgroundColor: scRaw(region.severity) }}/>
                </div>
              </button>
            ))}

            {/* Technical findings */}
            <div className="card" style={{ padding: '14px' }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Technical Findings</div>
              {[['Voice classifier','ElevenLabs v2',true],['Match confidence','88.4%',true],['Sample rate','48000 Hz',false],['Bit depth','16-bit PCM',false],['Formant F1','812 Hz (anom.)',true],['Formant F2','1,847 Hz (anom.)',true],['Noise floor','-62.4 dBFS',false],['DC offset','0.0003 (clean)',false]].map(([label,value,flag])=>(
                <div key={String(label)} style={{ display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid var(--c-border)' }}>
                  <span style={{ fontSize:'11px',color:'var(--c-muted)' }}>{label}</span>
                  <span style={{ fontSize:'11px',fontFamily:'var(--f-mono)',color:flag?'var(--c-warning)':'var(--c-text)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Verdict */}
            <div style={{ borderRadius: 'var(--radius)', padding: '16px', backgroundColor: 'var(--c-warning-bg)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div className="anim-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--c-warning)', flexShrink: 0 }}/>
                <span style={{ fontSize: '10px', fontFamily: 'var(--f-mono)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--c-warning)' }}>Voice Clone Detected</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--c-muted)', lineHeight: '1.6' }}>
                Formant patterns and spectral envelope match ElevenLabs v2 synthesis with 88.4% certainty. Two temporal regions show generation boundaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
