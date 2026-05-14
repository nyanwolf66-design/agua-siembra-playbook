'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { Search, Menu, X, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react'
import ContentRenderer from './ContentRenderer'
import TribuCards from './TribuCards'
import PortafolioCards from './PortafolioCards'

const C = {
  bg:          '#F6F2EA',
  canvas:      '#FFFFFF',
  surface:     '#F2EEE6',
  border:      '#E2DCCE',
  tinta:       '#0B0F12',
  charcoal:    '#1F2A30',
  steel:       '#6B7A85',
  stone:       '#94A0AA',
  siembra:     '#1F8A5B',
  siembraSoft: '#E5F4ED',
  andes:       '#0E2A3A',
  andesSoft:   '#DDE7EA',
  pagina:      '#F6F2EA',
  paginaDeep:  '#ECE5D6',
  tierra:      '#C9602F',
}

export default function PlaybookApp({ sections, parts }) {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id)
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const contentRef = useRef(null)
  const searchInputRef = useRef(null)

  const partMap = useMemo(() => Object.fromEntries(parts.map(p => [p.id, p])), [parts])
  const activeSection = sections.find(s => s.id === activeSectionId)
  const activePart = activeSection ? partMap[activeSection.partId] : parts[0]
  const activeIndex = sections.findIndex(s => s.id === activeSectionId)
  const prev = activeIndex > 0 ? sections[activeIndex - 1] : null
  const next = activeIndex < sections.length - 1 ? sections[activeIndex + 1] : null

  const searchResults = useMemo(() => {
    if (!query || query.length < 2) return []
    const lq = query.toLowerCase()
    return sections
      .filter(s => s.title.toLowerCase().includes(lq) || s.content.toLowerCase().includes(lq))
      .map(s => {
        const ci = s.content.toLowerCase().indexOf(lq)
        let snippet = ''
        if (ci >= 0) {
          const st = Math.max(0, ci - 50)
          snippet = (st > 0 ? '…' : '') + s.content.slice(st, ci + query.length + 60).replace(/[#*`_>]/g, '') + '…'
        }
        return { ...s, snippet }
      })
  }, [query, sections])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const handler = () => setShowScrollTop(el.scrollTop > 200)
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [])

  const navigate = useCallback((id) => {
    setActiveSectionId(id)
    setNavOpen(false)
    setSearchOpen(false)
    setQuery('')
    if (contentRef.current) contentRef.current.scrollTop = 0
    setShowScrollTop(false)
  }, [])

  const scrollTop = () => {
    if (contentRef.current) contentRef.current.scrollTop = 0
  }

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return (
    <div style={{ background: C.bg, minHeight: '100dvh', maxWidth: 480, margin: '0 auto', position: 'relative', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column', height: '100dvh' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'relative', zIndex: 50, flexShrink: 0,
        background: 'linear-gradient(135deg, #061A26 0%, #1B4358 100%)',
        boxShadow: '0 2px 12px rgba(6,26,38,0.35)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px' }}>
          <button
            onClick={() => { setNavOpen(v => !v); setSearchOpen(false) }}
            aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: 'rgba(250,247,241,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo centrado */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wordmark-white.png"
              alt="Agua Siembra"
              style={{ height: 18, width: 'auto', display: 'block' }}
            />
            <div style={{
              fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(250,247,241,0.55)', fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
            }}>
              Playbook Comercial
            </div>
          </div>

          <button
            onClick={() => { setSearchOpen(v => !v); setNavOpen(false); if (searchOpen) setQuery('') }}
            aria-label={searchOpen ? 'Cerrar búsqueda' : 'Buscar'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: searchOpen ? '#1F8A5B' : 'rgba(250,247,241,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Search size={20} />
          </button>
        </div>

        {searchOpen && (
          <div style={{ padding: '0 14px 12px' }}>
            <input
              ref={searchInputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar en el playbook…"
              style={{
                width: '100%', padding: '10px 14px',
                border: '1px solid rgba(250,247,241,0.20)',
                borderRadius: 8, fontSize: 14,
                background: 'rgba(250,247,241,0.10)',
                outline: 'none', color: '#FAF7F1',
                fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
          </div>
        )}
      </header>

      {/* ── Nav Drawer ── */}
      {navOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', maxWidth: 480, margin: '0 auto' }}>
          <nav style={{ width: '82%', maxWidth: 340, background: C.canvas, overflowY: 'auto', padding: '56px 0 32px', boxShadow: '4px 0 24px rgba(0,0,0,0.10)', WebkitOverflowScrolling: 'touch' }}>
            {/* Logo in drawer */}
            <div style={{ padding: '0 20px 16px', borderBottom: `1px solid ${C.border}`, marginBottom: 8 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.andes, letterSpacing: '0.06em', lineHeight: 1 }}>Agua Siembra</div>
              <div style={{ fontSize: 9, color: C.steel, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 3, fontFamily: "'Inter', sans-serif" }}>Playbook Comercial v3.0</div>
            </div>

            {parts.map(pt => {
              const ptSections = sections.filter(s => s.partId === pt.id)
              if (!ptSections.length) return null
              return (
                <div key={pt.id} style={{ marginBottom: 4 }}>
                  <div style={{ padding: '10px 20px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: pt.color, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {pt.num !== '—' && <span style={{ fontVariantNumeric: 'normal' }}>Parte {pt.num}</span>}
                    <span>— {pt.title}</span>
                  </div>
                  {ptSections.map(s => (
                    <button
                      key={s.id}
                      onClick={() => navigate(s.id)}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '9px 20px 9px 28px',
                        background: activeSectionId === s.id ? C.paginaDeep : 'transparent',
                        border: 'none', cursor: 'pointer',
                        fontSize: 14, lineHeight: 1.3,
                        color: activeSectionId === s.id ? C.tinta : C.steel,
                        fontWeight: activeSectionId === s.id ? 600 : 400,
                        borderLeft: activeSectionId === s.id ? `3px solid ${pt.color}` : '3px solid transparent',
                        transition: 'background 120ms ease',
                      }}
                    >
                      {typeof s.n === 'number' ? `${s.n}. ` : `${s.n}. `}{s.title}
                    </button>
                  ))}
                </div>
              )
            })}
          </nav>
          <div onClick={() => setNavOpen(false)} style={{ flex: 1, background: 'rgba(14,42,58,0.25)' }} />
        </div>
      )}

      {/* ── Search Results ── */}
      {searchOpen && query.length >= 2 && (
        <div ref={contentRef} style={{ flex: 1, overflowY: 'auto', padding: 16, WebkitOverflowScrolling: 'touch' }}>
          <div style={{ fontSize: 12, color: C.steel, marginBottom: 12, fontWeight: 500 }}>
            {searchResults.length} resultado{searchResults.length !== 1 && 's'} para "{query}"
          </div>
          {searchResults.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: C.stone, fontSize: 14 }}>
              Sin resultados. Prueba con otra palabra.
            </div>
          )}
          {searchResults.map(r => (
            <button
              key={r.id}
              onClick={() => navigate(r.id)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 16px', marginBottom: 8, background: C.canvas, border: `1px solid ${C.border}`, borderRadius: 12, cursor: 'pointer' }}
            >
              <div style={{ fontSize: 11, color: partMap[r.partId]?.color, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 3 }}>
                Sección {r.n} · {partMap[r.partId]?.title}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.tinta, marginBottom: 4 }}>{r.title}</div>
              {r.snippet && (
                <div style={{ fontSize: 12, color: C.steel, lineHeight: 1.5 }}>{r.snippet}</div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Content ── */}
      {!searchOpen && (
        <main
          ref={contentRef}
          style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 80 }}
        >
          {/* Section header */}
          <div style={{ padding: '20px 20px 0' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: activePart?.color, marginBottom: 6 }}>
              {activePart?.num !== '—' ? `Parte ${activePart?.num} · ` : ''}{activePart?.title}
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, fontWeight: 400, color: C.tinta, lineHeight: 0.95, letterSpacing: '0.03em', margin: 0 }}>
              {(typeof activeSection?.n === 'number' || typeof activeSection?.n === 'string') && (
                <span style={{ color: activePart?.color }}>{activeSection.n}.&nbsp;</span>
              )}
              {activeSection?.title}
            </h1>
          </div>

          {/* Section content card */}
          <div style={{ margin: '16px 16px 0', background: C.canvas, borderRadius: 14, padding: '20px 18px', border: `1px solid ${C.border}`, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            {activeSection && <ContentRenderer content={activeSection.content} />}
            {activeSection?.id === 's8' && <TribuCards />}
            {activeSection?.id === 's5' && <PortafolioCards />}
          </div>

          {/* Sequential navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '16px 16px 0' }}>
            {prev ? (
              <button onClick={() => navigate(prev.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, padding: '11px 12px', background: C.canvas, border: `1px solid ${C.border}`, borderRadius: 10, cursor: 'pointer', fontSize: 12, color: C.steel, minWidth: 0, textAlign: 'left' }}>
                <ChevronLeft size={14} style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.3 }}>{prev.title}</span>
              </button>
            ) : <div style={{ flex: 1 }} />}

            {next ? (
              <button onClick={() => navigate(next.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, padding: '11px 12px', background: C.canvas, border: `1px solid ${C.border}`, borderRadius: 10, cursor: 'pointer', fontSize: 12, color: C.steel, minWidth: 0, textAlign: 'right' }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.3 }}>{next.title}</span>
                <ChevronRight size={14} style={{ flexShrink: 0 }} />
              </button>
            ) : <div style={{ flex: 1 }} />}
          </div>

          {/* Section counter */}
          <div style={{ textAlign: 'center', padding: '12px 0 20px', fontSize: 11, color: C.stone, letterSpacing: '0.04em' }}>
            {activeIndex + 1} / {sections.length}
          </div>
        </main>
      )}

      {/* ── Scroll-to-top ── */}
      {showScrollTop && !navOpen && (
        <button
          onClick={scrollTop}
          aria-label="Volver arriba"
          style={{ position: 'fixed', bottom: 28, right: 20, width: 40, height: 40, borderRadius: '50%', background: C.andes, color: '#FAF7F1', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.18)', zIndex: 30 }}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  )
}
