import { useState } from 'react';

const MARKERS = [
  { time: '00:12', pct: 0.078, label: 'Facial morphing artifact',    detail: 'Facial mesh reconstruction error. GAN interpolation glitch across 6 frames.', severity: 'critical', frame: 347,  score: 0.934 },
  { time: '00:34', pct: 0.222, label: 'Background inconsistency',    detail: 'Background regenerated independently from foreground. Boundary seam at x=840.', severity: 'high',     frame: 1018, score: 0.871 },
  { time: '01:08', pct: 0.442, label: 'Audio-visual desync',         detail: 'Lip phoneme timing offset +38ms from cloned audio track. Blink suppression detected.', severity: 'high', frame: 2038, score: 0.843 },
  { time: '02:03', pct: 0.797, label: 'Lighting discontinuity',      detail: 'Lighting vector shift 23° between frames 3692–3701. Shadow on left orbital reversed.', severity: 'medium', frame: 3694, score: 0.762 },
];

const SUSPICIOUS_REGIONS = [
  { start: 0.063, end: 0.102, severity: 'critical' },
  { start: 0.208, end: 0.252, severity: 'high' },
  { start: 0.428, end: 0.471, severity: 'high' },
  { start: 0.784, end: 0.821, severity: 'medium' },
];

const THUMB_IMGS = [
  'photo-1568602471122-7832951cc4c5',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1560250097-0b93528c311a',
  'photo-1472099645785-5658abf4ff4e',
];

function sc(s) {
  return s === 'critical' ? 'var(--c-danger)' : s === 'high' ? 'var(--c-warning)' : 'var(--c-muted)';
}

function scRaw(s) {
  return s === 'critical' ? '#EF4444' : s === 'high' ? '#F59E0B' : '#9AA3AE';
}

export default function VideoForensics({ navigate }) {
  const [selected, setSelected] = useState(0);
  const [scrubber, setScrubber] = useState(MARKERS[0].pct);
  const [playing, setPlaying] = useState(false);

  const marker = MARKERS[selected];

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--c-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <button onClick={() => navigate('results')} style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--c-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}>← Results</button>
              <span style={{ color: 'var(--c-border)' }}>·</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--c-muted)' }}>INV-2026-0891</span>
            </div>
            <h1 style={{ fontFamily: 'var(--f-heading)', fontSize: '22px', fontWeight: '700', color: 'var(--c-text)' }}>Video Forensics</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-danger">4 Anomalies · 387 flagged frames</span>
            <button className="btn btn-ghost" onClick={() => navigate('audio-forensics')} style={{ fontSize: '12px' }}>Audio Forensics →</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Video player */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: '#000' }}>
                <img src={`https://images.unsplash.com/${THUMB_IMGS[selected]}?w=800&h=450&fit=crop&auto=format`} alt="Frame" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* Forensic grid overlay */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
                {/* Anomaly box */}
                <div style={{ position: 'absolute', top: '12%', left: '22%', width: '48%', height: '58%', border: `1.5px solid ${scRaw(marker.severity)}`, backgroundColor: `${scRaw(marker.severity)}0F` }}>
                  <div style={{ position: 'absolute', top: '-22px', left: 0, fontSize: '9px', fontFamily: 'var(--f-mono)', fontWeight: '600', padding: '2px 8px', backgroundColor: scRaw(marker.severity), color: '#08090B' }}>
                    ANOMALY · {(marker.score * 100).toFixed(1)}%
                  </div>
                  {[{t:'-1px',l:'-1px',bt:'2px',bl:'2px'},{t:'-1px',r:'-1px',bt:'2px',br:'2px'},{b:'-1px',l:'-1px',bb:'2px',bl:'2px'},{b:'-1px',r:'-1px',bb:'2px',br:'2px'}].map((c,i)=>(
                    <div key={i} style={{ position:'absolute',width:'14px',height:'14px',top:c.t,left:c.l,right:c.r,bottom:c.b, borderTop:c.bt?`${c.bt} solid ${scRaw(marker.severity)}`:'', borderLeft:c.bl?`${c.bl} solid ${scRaw(marker.severity)}`:'', borderRight:c.br?`${c.br} solid ${scRaw(marker.severity)}`:'', borderBottom:c.bb?`${c.bb} solid ${scRaw(marker.severity)}`:'' }} />
                  ))}
                </div>
                {/* Overlays */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--f-mono)', padding: '3px 8px', borderRadius: '3px', backgroundColor: 'rgba(0,0,0,0.88)', color: 'var(--c-accent)' }}>FRAME {marker.frame}</div>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--f-mono)', padding: '3px 8px', borderRadius: '3px', backgroundColor: 'rgba(0,0,0,0.88)', color: 'var(--c-muted)' }}>{marker.time}</div>
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '9px', fontFamily: 'var(--f-mono)', padding: '3px 8px', borderRadius: '3px', backgroundColor: `${scRaw(marker.severity)}22`, color: scRaw(marker.severity), border: `1px solid ${scRaw(marker.severity)}44` }}>
                  ⚠ {marker.severity.toUpperCase()}
                </div>
              </div>

              {/* Controls */}
              <div style={{ padding: '14px 16px', backgroundColor: 'var(--c-elevated)', borderTop: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => setPlaying(p=>!p)} style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  {playing ? <svg width="10" height="10" viewBox="0 0 10 10" fill="var(--c-text)"><rect x="1" y="1" width="3" height="8"/><rect x="6" y="1" width="3" height="8"/></svg>
                    : <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--c-text)"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                </button>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)', flexShrink: 0 }}>{marker.time} / 02:34</span>
                <div style={{ flex: 1, position: 'relative', height: '3px', borderRadius: '2px', backgroundColor: 'var(--c-border)', cursor: 'pointer' }}
                  onClick={e => { const r = e.currentTarget.getBoundingClientRect(); const pos = (e.clientX - r.left) / r.width; setScrubber(pos); const n = MARKERS.reduce((p,c) => Math.abs(c.pct-pos)<Math.abs(p.pct-pos)?c:p); setSelected(MARKERS.indexOf(n)); }}>
                  {SUSPICIOUS_REGIONS.map((r,i) => <div key={i} style={{ position:'absolute',top:0,bottom:0,left:`${r.start*100}%`,width:`${(r.end-r.start)*100}%`,backgroundColor:`${scRaw(r.severity)}66`,borderRadius:'2px' }} />)}
                  <div style={{ height: '3px', width: `${scrubber*100}%`, backgroundColor: 'var(--c-accent)', borderRadius: '2px' }} />
                  <div style={{ position:'absolute',top:'50%',transform:'translateY(-50%)',left:`calc(${scrubber*100}% - 6px)`,width:'12px',height:'12px',borderRadius:'50%',backgroundColor:'var(--c-text)',boxShadow:'0 0 0 2px var(--c-accent)' }} />
                </div>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)' }}>1×</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Forensic Timeline</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '10px', color: 'var(--c-muted)' }}>02:34 · 2,312 frames · 29.97 fps</span>
              </div>
              <div style={{ position: 'relative', height: '40px', borderRadius: '6px', overflow: 'hidden', backgroundColor: 'var(--c-elevated)', border: '1px solid var(--c-border)', cursor: 'pointer' }}
                onClick={e => { const r = e.currentTarget.getBoundingClientRect(); const pos = (e.clientX - r.left) / r.width; setScrubber(pos); const n = MARKERS.reduce((p,c) => Math.abs(c.pct-pos)<Math.abs(p.pct-pos)?c:p); setSelected(MARKERS.indexOf(n)); }}>
                <div style={{ position:'absolute',inset:0,backgroundColor:'rgba(34,197,94,0.05)' }}/>
                {SUSPICIOUS_REGIONS.map((r,i) => <div key={i} style={{ position:'absolute',top:0,bottom:0,left:`${r.start*100}%`,width:`${(r.end-r.start)*100}%`,backgroundColor:`${scRaw(r.severity)}44`,borderLeft:`2px solid ${scRaw(r.severity)}88` }}/>)}
                <div style={{ position:'absolute',top:0,bottom:0,width:'1px',left:`${scrubber*100}%`,backgroundColor:'var(--c-text)',opacity:0.65 }}/>
                {MARKERS.map((m,i) => (
                  <button key={i} onClick={e=>{e.stopPropagation();setSelected(i);setScrubber(m.pct);}} style={{ position:'absolute',top:'50%',left:`${m.pct*100}%`,transform:'translate(-50%,-50%)',width:'12px',height:'12px',rotate:'45deg',backgroundColor:scRaw(m.severity),border:'none',cursor:'pointer',boxShadow:selected===i?`0 0 8px ${scRaw(m.severity)}`:'none',transition:'all 0.15s' }}/>
                ))}
              </div>
              <div style={{ display:'flex',justifyContent:'space-between',marginTop:'6px',fontFamily:'var(--f-mono)',fontSize:'9px',color:'var(--c-muted)' }}>
                {['00:00','00:30','01:00','01:30','02:00','02:34'].map(t=><span key={t}>{t}</span>)}
              </div>
            </div>

            {/* Frame thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
              {MARKERS.map((m,i) => (
                <button key={i} onClick={()=>{setSelected(i);setScrubber(m.pct);}} style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: `1.5px solid ${selected===i ? scRaw(m.severity) : 'var(--c-border)'}`, cursor: 'pointer', textAlign: 'left', backgroundColor: 'transparent', transition: 'all 0.15s' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={`https://images.unsplash.com/${THUMB_IMGS[i]}?w=200&h=112&fit=crop&auto=format`} alt={m.label} style={{ width: '100%', height: '72px', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: `${scRaw(m.severity)}14` }}/>
                    <div style={{ position: 'absolute', top: '6px', right: '6px', fontSize: '8px', fontFamily: 'var(--f-mono)', padding: '1px 5px', borderRadius: '3px', backgroundColor: 'rgba(0,0,0,0.88)', color: scRaw(m.severity) }}>{m.time}</div>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: 'var(--c-surface)' }}>
                    <div style={{ fontSize: '10px', color: 'var(--c-muted)', marginBottom: '2px' }}>{m.label}</div>
                    <div style={{ fontSize: '9px', fontFamily: 'var(--f-mono)', color: scRaw(m.severity) }}>{(m.score*100).toFixed(1)}%</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: evidence markers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Evidence Markers</span>
            {MARKERS.map((m,i) => (
              <button key={i} onClick={()=>{setSelected(i);setScrubber(m.pct);}} style={{ width: '100%', textAlign: 'left', borderRadius: 'var(--radius)', padding: '16px', backgroundColor: selected===i ? 'var(--c-elevated)' : 'var(--c-surface)', border: `1px solid ${selected===i ? `${scRaw(m.severity)}55` : 'var(--c-border)'}`, cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'8px' }}>
                  <span style={{ fontFamily:'var(--f-mono)',fontSize:'12px',fontWeight:'600',color:scRaw(m.severity) }}>{m.time}</span>
                  <span style={{ fontSize:'9px',fontFamily:'var(--f-mono)',textTransform:'capitalize',padding:'2px 6px',borderRadius:'3px',backgroundColor:`${scRaw(m.severity)}18`,color:scRaw(m.severity) }}>{m.severity}</span>
                </div>
                <div style={{ fontSize:'12px',fontWeight:'500',color:'var(--c-text)',marginBottom:'6px' }}>{m.label}</div>
                <div style={{ fontSize:'11px',color:'var(--c-muted)',lineHeight:'1.5',marginBottom:'10px' }}>{m.detail}</div>
                <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'5px',fontSize:'10px',fontFamily:'var(--f-mono)',color:'var(--c-muted)' }}>
                  <span>Frame {m.frame}</span><span style={{ color:scRaw(m.severity) }}>{(m.score*100).toFixed(1)}%</span>
                </div>
                <div style={{ height:'2px',borderRadius:'2px',backgroundColor:'var(--c-border)' }}>
                  <div style={{ height:'2px',borderRadius:'2px',width:`${m.score*100}%`,backgroundColor:scRaw(m.severity) }}/>
                </div>
              </button>
            ))}

            {/* Detail panel */}
            <div className="card" style={{ padding: '16px', marginTop: '4px' }}>
              <div style={{ fontFamily:'var(--f-mono)',fontSize:'9px',color:'var(--c-muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'12px' }}>Frame Detail</div>
              {[['Timestamp',`${marker.time}`],['Frame index',`#${marker.frame}`],['Anomaly score',`${(marker.score*100).toFixed(1)}%`],['Classifier','StyleGAN3-det-v2'],['Region','Facial mesh'],['Severity',marker.severity.toUpperCase()]].map(([label,value])=>(
                <div key={label} style={{ display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--c-border)' }}>
                  <span style={{ fontSize:'11px',color:'var(--c-muted)' }}>{label}</span>
                  <span style={{ fontSize:'11px',fontFamily:'var(--f-mono)',color:label==='Severity'||label==='Anomaly score'?scRaw(marker.severity):'var(--c-text)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
