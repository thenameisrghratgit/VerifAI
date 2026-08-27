import { useState, useMemo } from 'react';
import MediaTypeRadio from '../components/MediaTypeRadio';
import NeoSwitch from '../components/NeoSwitch';
import BrowseFilesButton from '../components/BrowseFilesButton';

const pr = (seed) => { const x = Math.sin(seed + 7) * 10000; return x - Math.floor(x); };

const SAMPLE = {
  video: { name: 'press_conference_excerpt.mp4', size: '128.4 MB', duration: '02:34', dims: '1920 × 1080', img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=640&h=360&fit=crop&auto=format' },
  image: { name: 'profile_photo_disputed.jpg',  size: '3.2 MB',   duration: null,    dims: '3200 × 3200', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=640&fit=crop&auto=format' },
  audio: { name: 'statement_audio_full.wav',    size: '24.1 MB',  duration: '00:48', dims: null,          img: null },
};

const HEADERS = {
  video: { title: 'Drop media for forensic analysis', sub: 'Accepted formats: MP4 · MOV · AVI · max 2 GB' },
  image: { title: 'Drop media for forensic analysis', sub: 'Accepted formats: JPG · PNG · WEBP · max 50 MB' },
  audio: { title: 'Drop media for forensic analysis', sub: 'Accepted formats: WAV · MP3 · FLAC · max 500 MB' },
  text:  { title: 'Analyze text for forensic signals', sub: 'Paste text or upload a document for AI-generation and manipulation analysis.' },
};

const SAMPLE_TEXT = `The implementation of artificial intelligence in modern healthcare systems represents a paradigm shift in diagnostic methodologies. These advanced computational frameworks leverage sophisticated neural architectures to process complex medical data with unprecedented accuracy and efficiency. The integration of machine learning algorithms into clinical workflows has demonstrated significant improvements in early disease detection and patient outcome optimization.

Furthermore, the utilization of deep learning models for medical imaging analysis has revolutionized the interpretation of radiological data. Healthcare providers can now access real-time diagnostic support systems that augment clinical decision-making processes with evidence-based recommendations derived from extensive training datasets.`;

const FLAGGED_PASSAGES = [
  { start: 0, end: 147, reason: 'Writing pattern anomaly', type: 'Perplexity deviation', confidence: 91, detail: 'Unusually low perplexity score (18.4) indicates text was generated with high certainty by a language model.' },
];

export default function Analyze({ navigate }) {
  const [type, setType] = useState('video');
  const [uploaded, setUploaded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [depth, setDepth] = useState('deep');
  const [meta, setMetaEnabled] = useState(true);
  const [lang, setLang] = useState('auto');

  // Text tab state
  const [textContent, setTextContent] = useState('');
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [textReady, setTextReady] = useState(false);

  const sample = SAMPLE[type];
  const wave = useMemo(() => Array.from({ length: 80 }, (_, i) => 6 + pr(i * 3.7) * 30), []);
  const header = HEADERS[type];

  const wordCount = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
  const charCount = textContent.length;

  const handleTypeChange = (t) => {
    setType(t);
    setUploaded(false);
    setSelectedPassage(null);
    setTextReady(false);
  };

  // Render flagged text with highlight spans
  const renderAnnotatedText = () => {
    const text = SAMPLE_TEXT;
    const parts = [];
    let cursor = 0;
    const sorted = [...FLAGGED_PASSAGES].sort((a, b) => a.start - b.start);

    sorted.forEach((p, i) => {
      if (cursor < p.start) parts.push({ text: text.slice(cursor, p.start), flagged: false });
      parts.push({ text: text.slice(p.start, p.end), flagged: true, idx: i, passage: p });
      cursor = p.end;
    });
    if (cursor < text.length) parts.push({ text: text.slice(cursor), flagged: false });
    return parts;
  };

  const isTextSubmittable = type === 'text' ? (textContent.trim().length > 20 || textReady) : true;

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: 'var(--c-bg)' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '32px 40px' }}>

        {/* Header — dynamic per type */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--f-heading)', fontSize: '22px', fontWeight: '700', color: 'var(--c-text)', marginBottom: '6px', transition: 'none' }}>
            {header.title}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--c-muted)' }}>
            {header.sub}
          </p>
        </div>

        {/* Type switcher */}
        <div style={{ marginBottom: '20px' }}>
          <MediaTypeRadio value={type} onChange={handleTypeChange} />
        </div>

        {/* ── MEDIA UPLOAD AREA (Video / Image / Audio) ── */}
        {type !== 'text' && (
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); }}
            style={{
              height: '280px',
              border: `1.5px dashed ${dragging ? 'var(--c-accent)' : 'var(--c-border)'}`,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: dragging ? 'var(--c-success-bg)' : 'var(--c-surface)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'default',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: dragging ? 'var(--c-success-bg)' : 'var(--c-elevated)', border: `1px solid ${dragging ? 'var(--c-accent)' : 'var(--c-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', transition: 'all 0.2s' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={dragging ? 'var(--c-accent)' : 'var(--c-muted)'} strokeWidth="1.75" style={{ transition: 'stroke 0.2s' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--c-text)', marginBottom: '4px' }}>
              Drop {type} file here, or click to browse
            </p>
            <p style={{ fontSize: '12px', color: 'var(--c-muted)', fontFamily: 'var(--f-mono)' }}>
              {type === 'video' ? 'MP4, MOV, AVI · max 2 GB' : type === 'image' ? 'JPG, PNG, WEBP · max 50 MB' : 'WAV, MP3, FLAC · max 500 MB'}
            </p>
            <div style={{ marginTop: '16px' }}><BrowseFilesButton type={type} /></div>
          </div>
        )}

        {/* ── TEXT TAB WORKSPACE ── */}
        {type === 'text' && (
          <>
            {!textReady ? (
              /* Text editor */
              <div className="card" style={{ overflow: 'hidden' }}>
                {/* Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid var(--c-border)', backgroundColor: 'var(--c-elevated)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Document</span>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-border)' }}>·</span>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)' }}>TXT · DOCX · PDF</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Upload doc button */}
                    <button
                      onClick={() => setTextContent(SAMPLE_TEXT)}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontFamily: 'var(--f-ui)', cursor: 'pointer', backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-muted)', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-text)'; e.currentTarget.style.borderColor = 'var(--c-muted)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-muted)'; e.currentTarget.style.borderColor = 'var(--c-border)'; }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      Upload document
                    </button>
                    {/* Clear button */}
                    {textContent && (
                      <button
                        onClick={() => setTextContent('')}
                        style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontFamily: 'var(--f-ui)', cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid transparent', color: 'var(--c-muted)', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-danger)'; e.currentTarget.style.borderColor = 'var(--c-danger)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-muted)'; e.currentTarget.style.borderColor = 'transparent'; }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Textarea */}
                <textarea
                  value={textContent}
                  onChange={e => setTextContent(e.target.value)}
                  placeholder="Paste text here..."
                  style={{
                    width: '100%',
                    minHeight: '260px',
                    padding: '20px',
                    backgroundColor: 'var(--c-surface)',
                    border: 'none',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'var(--f-ui)',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: 'var(--c-text)',
                    boxSizing: 'border-box',
                  }}
                />

                {/* Footer counts */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderTop: '1px solid var(--c-border)', backgroundColor: 'var(--c-elevated)' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: '10px', color: 'var(--c-muted)' }}>
                      <span style={{ color: 'var(--c-text)', fontWeight: '500' }}>{wordCount.toLocaleString()}</span> words
                    </span>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: '10px', color: 'var(--c-muted)' }}>
                      <span style={{ color: 'var(--c-text)', fontWeight: '500' }}>{charCount.toLocaleString()}</span> characters
                    </span>
                  </div>
                  {textContent.trim().length > 20 && (
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: '10px', color: 'var(--c-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      Ready
                    </span>
                  )}
                </div>
              </div>
            ) : (
              /* Text evidence view — shown after mock analysis */
              <div className="card" style={{ overflow: 'hidden' }}>
                {/* Evidence header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--c-border)', backgroundColor: 'var(--c-elevated)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge badge-danger">Likely AI Generated</span>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)' }}>87% confidence</span>
                  </div>
                  <button onClick={() => { setTextReady(false); setSelectedPassage(null); }} style={{ fontSize: '11px', color: 'var(--c-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--f-ui)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}>
                    ← Edit text
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px' }}>
                  {/* Annotated text */}
                  <div style={{ padding: '20px', borderRight: '1px solid var(--c-border)', fontFamily: 'var(--f-ui)', fontSize: '14px', lineHeight: '1.75', color: 'var(--c-text)' }}>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
                      Annotated Document — click highlighted passages
                    </div>
                    <p>
                      {renderAnnotatedText().map((part, i) =>
                        part.flagged ? (
                          <mark
                            key={i}
                            onClick={() => { const idx = part.idx; setSelectedPassage(selectedPassage === idx ? null : idx); }}
                            style={{
                              backgroundColor: selectedPassage === part.idx ? 'rgba(245,158,11,0.35)' : 'rgba(245,158,11,0.18)',
                              color: 'var(--c-text)',
                              borderRadius: '2px',
                              padding: '1px 0',
                              cursor: 'pointer',
                              borderBottom: `2px solid ${selectedPassage === part.idx ? 'var(--c-warning)' : 'rgba(245,158,11,0.5)'}`,
                              transition: 'all 0.15s',
                            }}
                          >
                            {part.text}
                          </mark>
                        ) : (
                          <span key={i}>{part.text}</span>
                        )
                      )}
                    </p>
                  </div>

                  {/* Passage detail panel */}
                  <div style={{ padding: '16px', backgroundColor: 'var(--c-elevated)' }}>
                    {selectedPassage !== null ? (
                      <>
                        <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
                          Passage Analysis
                        </div>
                        {(() => {
                          const p = FLAGGED_PASSAGES[selectedPassage];
                          return (
                            <>
                              <div style={{ marginBottom: '14px' }}>
                                <div style={{ fontSize: '11px', color: 'var(--c-muted)', marginBottom: '5px' }}>Confidence</div>
                                <div style={{ fontFamily: 'var(--f-heading)', fontSize: '22px', fontWeight: '700', color: 'var(--c-warning)', marginBottom: '5px' }}>{p.confidence}%</div>
                                <div style={{ height: '3px', borderRadius: '2px', backgroundColor: 'var(--c-border)' }}>
                                  <div style={{ height: '3px', borderRadius: '2px', width: `${p.confidence}%`, backgroundColor: 'var(--c-warning)' }} />
                                </div>
                              </div>
                              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', marginBottom: '10px' }}>
                                <div style={{ fontSize: '10px', color: 'var(--c-muted)', marginBottom: '3px' }}>Reason flagged</div>
                                <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--c-text)' }}>{p.reason}</div>
                              </div>
                              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', marginBottom: '10px' }}>
                                <div style={{ fontSize: '10px', color: 'var(--c-muted)', marginBottom: '3px' }}>Evidence type</div>
                                <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--c-text)' }}>{p.type}</div>
                              </div>
                              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                                <div style={{ fontSize: '10px', color: 'var(--c-muted)', marginBottom: '5px' }}>Detail</div>
                                <div style={{ fontSize: '11px', color: 'var(--c-muted)', lineHeight: '1.55' }}>{p.detail}</div>
                              </div>
                            </>
                          );
                        })()}
                      </>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', opacity: 0.5 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-muted)" strokeWidth="1.5">
                          <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                        </svg>
                        <span style={{ fontSize: '11px', color: 'var(--c-muted)', textAlign: 'center', fontFamily: 'var(--f-mono)' }}>
                          Click a highlighted passage
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Evidence list footer */}
                <div style={{ borderTop: '1px solid var(--c-border)', padding: '12px 16px', backgroundColor: 'var(--c-elevated)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Writing pattern anomaly', 'Sentence uniformity', 'Perplexity deviation', 'Burstiness anomaly', 'Stylometric inconsistency'].map((e, i) => (
                    <span key={e} className="badge badge-warning" style={{ fontSize: '10px', opacity: i < 3 ? 1 : 0.6 }}>{e}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── ANALYSIS CONFIGURATION ── */}
        <div className="card" style={{ padding: '20px', marginTop: '16px' }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
            Analysis Configuration
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: type === 'text' ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr', gap: '24px' }}>
            {/* Depth */}
            <div>
              <div style={{ fontSize: '12px', color: 'var(--c-text)', marginBottom: '10px' }}>Depth</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[['standard', 'Standard'], ['deep', 'Deep Scan']].map(([val, label]) => (
                  <button key={val} onClick={() => setDepth(val)} style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--f-mono)', border: `1px solid ${depth === val ? 'var(--c-accent)' : 'var(--c-border)'}`, backgroundColor: depth === val ? 'var(--c-accent)' : 'var(--c-elevated)', color: depth === val ? '#08090B' : 'var(--c-muted)', fontWeight: depth === val ? '500' : '400', transition: 'all 0.15s' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language — text only */}
            {type === 'text' && (
              <div>
                <div style={{ fontSize: '12px', color: 'var(--c-text)', marginBottom: '10px' }}>Language</div>
                <button onClick={() => {}} style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--f-mono)', border: '1px solid var(--c-accent)', backgroundColor: 'var(--c-accent)', color: '#08090B', fontWeight: '500' }}>
                  Auto Detect
                </button>
              </div>
            )}

            {/* Metadata / Doc Metadata */}
            <div>
              <div style={{ fontSize: '12px', color: 'var(--c-text)', marginBottom: '10px' }}>
                {type === 'text' ? 'Document Metadata' : 'Metadata'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <NeoSwitch checked={meta} onChange={() => setMetaEnabled(m => !m)} />
                <span style={{ fontSize: '12px', color: meta ? 'var(--c-text)' : 'var(--c-muted)', fontFamily: 'var(--f-ui)' }}>{meta ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>

            {/* Queue */}
            <div>
              <div style={{ fontSize: '12px', color: 'var(--c-text)', marginBottom: '10px' }}>Queue</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div className="anim-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--c-success)' }} />
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--c-muted)' }}>Standard · 0 queued</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SUBMIT ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
          <p style={{ fontSize: '12px', fontFamily: 'var(--f-mono)', color: 'var(--c-muted)' }}>
            {type === 'text'
              ? (textContent.trim().length > 20 ? `${wordCount} words · ${charCount} characters · ready` : 'No text entered')
              : 'Drop or browse a file to begin'}
          </p>
          <button
            onClick={() => {
              if (type === 'text' && textContent.trim().length > 20) {
                setTextReady(true);
              } else if (type !== 'text') {
                navigate('analysis');
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'var(--f-ui)',
              cursor: isTextSubmittable ? 'pointer' : 'not-allowed',
              border: 'none',
              backgroundColor: isTextSubmittable ? 'var(--c-accent)' : 'var(--c-elevated)',
              color: isTextSubmittable ? '#08090B' : 'var(--c-muted)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => isTextSubmittable && (e.currentTarget.style.filter = 'brightness(1.08)')}
            onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {type === 'text' ? (textReady ? 'Re-analyze Text' : 'Analyze Text') : 'Begin Forensic Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
}
