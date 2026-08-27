import { useState } from 'react';

const FINDINGS = [
  { label: 'GAN Fingerprint',    value: 'StyleGAN3 (96.1%)', severity: 'critical', detail: 'Checkerboard upsampling artifacts at 0.25 Nyquist. Spectral signature consistent with progressive growing GAN architecture.' },
  { label: 'Facial Symmetry',    value: '98.7% symmetric',   severity: 'critical', detail: 'Exceeds natural human asymmetry bounds by 3.2σ. GAN-generated faces trend hyper-symmetric due to mirrored training augmentation.' },
  { label: 'Skin Texture',       value: 'Anomalous',          severity: 'high',     detail: 'High-frequency texture response inconsistent with photographic skin. Noise floor mismatches expected sensor pattern.' },
  { label: 'Eye Reflections',    value: 'Inconsistent',       severity: 'high',     detail: 'Left and right ocular specular highlights show mismatched light source position. Corneal reflection geometry impossible.' },
  { label: 'Hair Detail',        value: 'Partially anomalous',severity: 'medium',   detail: 'Individual strand coherence breaks down at image periphery. Characteristic of convolution boundary artifacts.' },
  { label: 'Background Region',  value: 'Clean',              severity: 'clear',    detail: 'Background region shows no signs of compositing or independent generation. Consistent with authentic photography.' },
];

function scRaw(s) {
  return s === 'critical' ? '#EF4444' : s === 'high' ? '#F59E0B' : s === 'clear' ? '#22C55E' : '#9AA3AE';
}

export default function ImageForensics({ navigate }) {
  const [view, setView] = useState('original');
  const [zoom, setZoom] = useState(100);

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
              <span style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--c-muted)' }}>INV-2026-0889</span>
            </div>
            <h1 style={{ fontFamily: 'var(--f-heading)', fontSize: '22px', fontWeight: '700', color: 'var(--c-text)', marginBottom: '4px' }}>Image Forensics</h1>
            <div style={{ fontSize: '13px', color: 'var(--c-muted)', fontFamily: 'var(--f-mono)' }}>profile_photo_disputed.jpg · 3.2 MB · 3200 × 3200</div>
          </div>
          <span className="badge badge-danger" style={{ fontSize: '11px', padding: '6px 12px' }}>Likely AI Generated · 97.1%</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px' }}>
          {/* Image viewer */}
          <div>
            {/* View tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', padding: '4px', backgroundColor: 'var(--c-elevated)', borderRadius: 'var(--radius)', width: 'fit-content' }}>
              {['original', 'analysis', 'heatmap'].map(m => (
                <button key={m} onClick={() => setView(m)} style={{ padding: '7px 16px', borderRadius: 'var(--radius-sm)', fontSize: '12px', cursor: 'pointer', border: 'none', fontFamily: 'var(--f-ui)', backgroundColor: view === m ? 'var(--c-surface)' : 'transparent', color: view === m ? 'var(--c-text)' : 'var(--c-muted)', fontWeight: view === m ? '500' : '400', textTransform: 'capitalize', transition: 'all 0.15s' }}>
                  {m}
                </button>
              ))}
            </div>

            {/* Image container */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '500px', backgroundColor: 'var(--c-elevated)' }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=700&fit=crop&auto=format"
                  alt="Subject"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', filter: view === 'analysis' ? 'brightness(0.85)' : 'none' }}
                />

                {view === 'analysis' && (
                  <>
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                    {/* Face box */}
                    <div style={{ position: 'absolute', top: '6%', left: '22%', width: '54%', height: '70%', border: '1.5px solid #EF4444', backgroundColor: 'rgba(239,68,68,0.06)' }}>
                      <div style={{ position: 'absolute', top: '-22px', left: 0, fontSize: '9px', fontFamily: 'var(--f-mono)', fontWeight: '600', padding: '2px 8px', backgroundColor: '#EF4444', color: '#fff' }}>FACE REGION · 97.2% ANOMALOUS</div>
                      {[{t:'-1px',l:'-1px'},{t:'-1px',r:'-1px'},{b:'-1px',l:'-1px'},{b:'-1px',r:'-1px'}].map((c,i)=>(
                        <div key={i} style={{ position:'absolute',width:'14px',height:'14px',top:c.t,left:c.l,right:c.r,bottom:c.b, borderTop:c.t?'2px solid #EF4444':'', borderLeft:c.l!==undefined?'2px solid #EF4444':'', borderRight:c.r?'2px solid #EF4444':'', borderBottom:c.b?'2px solid #EF4444':'' }}/>
                      ))}
                    </div>
                    {/* Eye regions */}
                    <div style={{ position:'absolute',top:'24%',left:'28%',width:'16%',height:'9%',border:'1px solid #F59E0B' }}>
                      <div style={{ position:'absolute',top:'-18px',left:0,fontSize:'8px',fontFamily:'var(--f-mono)',padding:'1px 4px',backgroundColor:'#F59E0B',color:'#08090B' }}>Eye L</div>
                    </div>
                    <div style={{ position:'absolute',top:'24%',left:'56%',width:'16%',height:'9%',border:'1px solid #F59E0B' }}>
                      <div style={{ position:'absolute',top:'-18px',left:0,fontSize:'8px',fontFamily:'var(--f-mono)',padding:'1px 4px',backgroundColor:'#F59E0B',color:'#08090B' }}>Eye R</div>
                    </div>
                  </>
                )}

                {view === 'heatmap' && (
                  <>
                    <div style={{ position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(ellipse 52% 68% at 50% 36%, rgba(239,68,68,0.58) 0%, rgba(239,68,68,0.32) 28%, rgba(245,158,11,0.22) 52%, rgba(245,158,11,0.06) 70%, transparent 100%)',mixBlendMode:'screen' }} />
                    <div style={{ position:'absolute',right:'10px',top:'10px',bottom:'10px',width:'24px',display:'flex',flexDirection:'column',alignItems:'center',gap:'4px' }}>
                      <div style={{ flex:1,width:'8px',borderRadius:'4px',background:'linear-gradient(to bottom, #EF4444, #F59E0B, rgba(34,197,94,0.3), transparent)' }}/>
                      <span style={{ fontSize:'8px',fontFamily:'var(--f-mono)',color:'#EF4444' }}>High</span>
                      <span style={{ fontSize:'8px',fontFamily:'var(--f-mono)',color:'var(--c-muted)' }}>Low</span>
                    </div>
                  </>
                )}

                {/* Info bar */}
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--f-mono)', padding: '3px 8px', borderRadius: '3px', backgroundColor: 'rgba(0,0,0,0.88)', color: 'var(--c-accent)' }}>{zoom}% zoom</div>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--f-mono)', padding: '3px 8px', borderRadius: '3px', backgroundColor: 'rgba(0,0,0,0.88)', color: 'var(--c-muted)' }}>3200 × 3200 · JPG</div>
                </div>
              </div>

              {/* Zoom controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderTop: '1px solid var(--c-border)', backgroundColor: 'var(--c-elevated)' }}>
                <button onClick={() => setZoom(z => Math.max(50, z - 25))} style={{ width: '24px', height: '24px', borderRadius: '4px', backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-text)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <div style={{ flex: 1, height: '2px', borderRadius: '2px', backgroundColor: 'var(--c-border)' }}>
                  <div style={{ height: '2px', borderRadius: '2px', width: `${((zoom - 50) / 150) * 100}%`, backgroundColor: 'var(--c-accent)' }}/>
                </div>
                <button onClick={() => setZoom(z => Math.min(200, z + 25))} style={{ width: '24px', height: '24px', borderRadius: '4px', backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-text)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)', minWidth: '36px', textAlign: 'right' }}>{zoom}%</span>
              </div>
            </div>

            {/* Frequency domain (heatmap mode) */}
            {view === 'heatmap' && (
              <div className="card" style={{ padding: '16px', marginTop: '16px' }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>Frequency Domain Anomaly</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
                  {[{ band: 'High-freq', pct: 94.2, color: '#EF4444' }, { band: 'Mid-freq', pct: 67.8, color: '#F59E0B' }, { band: 'Low-freq', pct: 22.1, color: '#22C55E' }, { band: 'Phase', pct: 88.5, color: '#EF4444' }].map(item => (
                    <div key={item.band}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '10px' }}>
                        <span style={{ color: 'var(--c-muted)' }}>{item.band}</span>
                        <span style={{ fontFamily: 'var(--f-mono)', color: item.color }}>{item.pct}%</span>
                      </div>
                      <div style={{ height: '2px', borderRadius: '2px', backgroundColor: 'var(--c-border)' }}>
                        <div style={{ height: '2px', borderRadius: '2px', width: `${item.pct}%`, backgroundColor: item.color }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Evidence panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Evidence Details</span>
            {FINDINGS.map(f => (
              <div key={f.label} className="card" style={{ padding: '14px' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${scRaw(f.severity)}44`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--c-border)')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--c-text)' }}>{f.label}</span>
                  <span style={{ fontSize: '9px', fontFamily: 'var(--f-mono)', textTransform: 'capitalize', padding: '2px 6px', borderRadius: '3px', backgroundColor: `${scRaw(f.severity)}18`, color: scRaw(f.severity) }}>{f.severity}</span>
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: f.severity === 'clear' ? 'var(--c-success)' : 'var(--c-text)', marginBottom: '6px' }}>{f.value}</div>
                <div style={{ fontSize: '10px', color: 'var(--c-muted)', lineHeight: '1.55' }}>{f.detail}</div>
              </div>
            ))}

            {/* File info */}
            <div className="card" style={{ padding: '14px', marginTop: '4px' }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>File Info</div>
              {[['Dimensions','3200 × 3200 px',false],['Format','JPEG / YCbCr 4:2:0',false],['Color depth','8-bit / channel',false],['File size','3.24 MB',false],['DPI','72 (screen)',false],['EXIF data','STRIPPED',true],['Camera','MISSING',true],['ICC profile','sRGB IEC61966-2.1',false]].map(([label,value,flag])=>(
                <div key={String(label)} style={{ display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid var(--c-border)' }}>
                  <span style={{ fontSize:'11px',color:'var(--c-muted)' }}>{label}</span>
                  <span style={{ fontSize:'11px',fontFamily:'var(--f-mono)',color:flag?'var(--c-danger)':'var(--c-text)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
