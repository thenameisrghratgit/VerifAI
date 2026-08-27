import { useState, useEffect } from 'react';

const STEPS = [
  { label: 'Ingesting', desc: 'Loading file · verifying integrity' },
  { label: 'Extracting frames', desc: 'Decoding H.264 · 2,312 frames at 15 fps' },
  { label: 'Visual analysis', desc: 'Facial geometry · GAN artifact detection' },
  { label: 'Audio analysis', desc: 'Voice cloning · spectral anomalies' },
  { label: 'Temporal analysis', desc: 'Inter-frame consistency · optical flow' },
  { label: 'Metadata inspection', desc: 'EXIF parsing · codec fingerprinting' },
  { label: 'Generating report', desc: 'Compiling evidence · calibrating scores' },
];

const LOG = [
  'Initializing forensic pipeline v2.4.1',
  'Loading: press_conference_excerpt.mp4 (128.4 MB)',
  'Decoding H.264 · 1920×1080 · 29.97 fps',
  'Frame extraction initiated · 2,312 target frames',
  'Batch 1/12 · 192 frames processed',
  'Batch 4/12 · 768 frames processed',
  'Batch 8/12 · 1,536 frames processed',
  'Facial landmark detection · 847 face instances',
  'GAN classifier loaded · threshold: 0.65',
  'Anomaly at frame 0347 · score: 0.891',
  'Anomaly at frame 1024 · score: 0.934',
  'Batch 12/12 · complete',
  'Audio stream extracted · 48 kHz · stereo',
  'Voice cloning classifier active',
  'Formant anomaly: F1=812 Hz, F2=1847 Hz',
  'Spectral gap detected at t=0:08–0:11',
  'Optical flow computed · 2,311 transitions',
  'EXIF: creation 2026-08-27T11:22:07Z',
  'Codec fingerprint: FFmpeg 6.0',
  'GPS data: stripped',
  'Evidence compilation initiated',
  'Confidence calibration applied',
  'Report generation complete.',
];

const TICK_MAX = 115;

export default function Analysis({ navigate }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => {
        const next = t + 1;
        if (next >= TICK_MAX) { clearInterval(id); setTimeout(() => navigate('results'), 900); return TICK_MAX; }
        return next;
      });
    }, 130);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = Math.min(100, (tick / TICK_MAX) * 100);
  const done = tick >= TICK_MAX;
  const activeIdx = done ? STEPS.length - 1 : Math.min(Math.floor((tick / TICK_MAX) * STEPS.length), STEPS.length - 1);
  const logCount = Math.min(LOG.length, Math.floor((tick / TICK_MAX) * LOG.length) + 2);
  const logShown = LOG.slice(Math.max(0, logCount - 12), logCount);

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--c-bg)' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '32px 40px' }}>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--f-heading)', fontSize: '22px', fontWeight: '700', color: 'var(--c-text)', marginBottom: '4px' }}>
            Forensic Analysis
          </h1>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '12px', color: 'var(--c-muted)' }}>press_conference_excerpt.mp4</span>
            <span style={{ color: 'var(--c-border)' }}>·</span>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '12px', color: 'var(--c-muted)' }}>INV-2026-0891</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--c-text)' }}>
              {done ? 'Analysis complete' : `${STEPS[activeIdx]?.label}…`}
            </span>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '13px', color: 'var(--c-accent)' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{ height: '4px', backgroundColor: 'var(--c-elevated)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '4px', backgroundColor: 'var(--c-accent)', borderRadius: '2px', width: `${progress}%`, transition: 'width 0.3s ease' }} />
          </div>
          {!done && (
            <div style={{ marginTop: '8px', fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--c-muted)' }}>
              {STEPS[activeIdx]?.desc}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px' }}>
          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {STEPS.map((step, idx) => {
              const isComplete = idx < activeIdx || done;
              const isActive = idx === activeIdx && !done;
              return (
                <div
                  key={step.label}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isActive ? 'var(--c-elevated)' : 'transparent',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <div style={{ flexShrink: 0, marginTop: '1px' }}>
                    {isComplete ? (
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'var(--c-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--c-success)" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                    ) : isActive ? (
                      <div className="anim-spin" style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--c-accent)', borderTopColor: 'transparent' }} />
                    ) : (
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid var(--c-border)' }} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: isActive ? '500' : '400', color: isComplete ? 'var(--c-success)' : isActive ? 'var(--c-text)' : 'var(--c-muted)' }}>
                      {step.label}
                    </div>
                    {isActive && (
                      <div className="anim-pulse" style={{ fontSize: '10px', fontFamily: 'var(--f-mono)', color: 'var(--c-muted)', marginTop: '2px' }}>
                        processing…
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Log terminal */}
          <div
            style={{
              backgroundColor: 'var(--c-elevated)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius)',
              padding: '16px',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: 'var(--f-mono)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid var(--c-border)', marginBottom: '12px', flexShrink: 0 }}>
              <span style={{ fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Log</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                {['var(--c-danger)', 'var(--c-warning)', 'var(--c-success)'].map(c => (
                  <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: c, opacity: 0.5 }} />
                ))}
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '4px' }}>
              {logShown.map((line, i) => (
                <div
                  key={i}
                  className="anim-fade-up"
                  style={{
                    fontSize: '10px',
                    lineHeight: '1.5',
                    color:
                      i === logShown.length - 1 && !done ? 'var(--c-accent)' :
                      line.includes('anomaly') || line.includes('stripped') ? 'var(--c-danger)' :
                      'var(--c-muted)',
                    animationDelay: `${i * 15}ms`,
                  }}
                >
                  <span style={{ color: 'var(--c-border)', marginRight: '6px' }}>›</span>{line}
                </div>
              ))}
              {!done && <div style={{ fontSize: '10px', color: 'var(--c-accent)' }}><span className="anim-blink">_</span></div>}
            </div>
          </div>
        </div>

        {/* Frame strip */}
        <div className="card" style={{ padding: '16px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Frame Preview
            </span>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '10px', color: 'var(--c-muted)' }}>
              {Math.round((tick / TICK_MAX) * 2312).toLocaleString()} / 2,312
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px', overflow: 'hidden', height: '60px' }}>
            {['photo-1568602471122-7832951cc4c5', 'photo-1507003211169-0a1dd7228f2d', 'photo-1560250097-0b93528c311a', 'photo-1472099645785-5658abf4ff4e',
              'photo-1568602471122-7832951cc4c5', 'photo-1507003211169-0a1dd7228f2d', 'photo-1560250097-0b93528c311a'].map((id, i) => {
              const scanned = (i / 7) < (tick / TICK_MAX);
              const flag = i === 1 || i === 5;
              return (
                <div key={i} style={{ flexShrink: 0, width: '90px', height: '60px', borderRadius: '4px', overflow: 'hidden', position: 'relative', border: `1px solid ${flag && scanned ? 'var(--c-danger)' : 'var(--c-border)'}`, opacity: scanned ? 1 : 0.25, transition: 'opacity 0.5s' }}>
                  <img src={`https://images.unsplash.com/${id}?w=120&h=80&fit=crop&auto=format`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {flag && scanned && <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(239,68,68,0.15)' }} />}
                  {scanned && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, fontSize: '7px', fontFamily: 'var(--f-mono)', padding: '2px 4px', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.75)', color: flag ? 'var(--c-danger)' : 'var(--c-success)' }}>
                      {flag ? 'FLAGGED' : 'CLEAN'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {done && (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => navigate('results')}
              className="btn btn-primary"
              style={{ padding: '10px 22px', fontSize: '13px' }}
            >
              View Results →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
