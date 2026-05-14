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
    <div style={{ background: 'linear-gradient(180deg, #43B02A 0%, #00B189 100%)', minHeight: '100dvh', maxWidth: 480, margin: '0 auto', position: 'relative', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column', height: '100dvh' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'relative', zIndex: 50, flexShrink: 0,
        background: '#000000',
        boxShadow: '0 2px 8px rgba(0,0,0,0.40)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', gap: 10 }}>
          {/* Left: hamburger + logo */}
          <button
            onClick={() => { setNavOpen(v => !v); setSearchOpen(false) }}
            aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/wordmark-white.png"
            alt="Agua Siembra"
            style={{ height: 66, width: 'auto', display: 'block', flexShrink: 0 }}
          />

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Right: subtitle + search */}
          <div style={{
            fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.50)', fontFamily: "'Inter', sans-serif",
            fontWeight: 600, flexShrink: 0,
          }}>
            Playbook Comercial
          </div>

          <button
            onClick={() => { setSearchOpen(v => !v); setNavOpen(false); if (searchOpen) setQuery('') }}
            aria-label={searchOpen ? 'Cerrar búsqueda' : 'Buscar'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: searchOpen ? '#43B02A' : 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', maxWidth: 480, margin: '0 auto' }}>
          <nav style={{ width: '82%', maxWidth: 340, background: '#000000', overflowY: 'auto', padding: '20px 0 32px', boxShadow: '4px 0 24px rgba(0,0,0,0.50)', WebkitOverflowScrolling: 'touch' }}>
            {/* Logo in drawer */}
            <div style={{ padding: '0 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.10)', marginBottom: 8 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: '#FFFFFF', letterSpacing: '0.06em', lineHeight: 1 }}>Agua Siembra</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4, fontFamily: "'Inter', sans-serif" }}>Playbook Comercial v3.0</div>
            </div>

            {parts.map((pt, ptIdx) => {
              const ptSections = sections.filter(s => s.partId === pt.id)
              if (!ptSections.length) return null
              const drawerColors = ['#C3D5A0','#81A9AF','#92B992','#4C7B84','#E2C792','#C98C73','#55836D']
              const drawerColor = drawerColors[ptIdx] ?? '#C3D5A0'
              return (
                <div key={pt.id} style={{ marginBottom: 4 }}>
                  <div style={{ padding: '10px 20px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: drawerColor, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {pt.num !== '—' && <span>Parte {pt.num}</span>}
                    <span>— {pt.title}</span>
                  </div>
                  {ptSections.map(s => {
                    const isActive = activeSectionId === s.id
                    return (
                      <button
                        key={s.id}
                        onClick={() => navigate(s.id)}
                        style={{
                          display: 'flex', alignItems: 'flex-start', width: '100%', textAlign: 'left',
                          padding: '8px 20px 8px 20px',
                          background: isActive ? 'rgba(255,255,255,0.10)' : 'transparent',
                          border: 'none', cursor: 'pointer',
                          fontSize: 13, lineHeight: 1.4,
                          color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                          fontWeight: isActive ? 600 : 400,
                          borderLeft: isActive ? `3px solid ${drawerColor}` : '3px solid transparent',
                          transition: 'background 120ms ease',
                        }}
                      >
                        <span style={{ minWidth: 28, flexShrink: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: isActive ? drawerColor : 'rgba(255,255,255,0.30)', paddingTop: 1 }}>{s.n}.</span>
                        <span style={{ flex: 1 }}>{s.title}</span>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </nav>
          <div onClick={() => setNavOpen(false)} style={{ flex: 1, background: 'rgba(0,0,0,0.50)' }} />
        </div>
      )}

      {/* ── Search Results ── */}
      {searchOpen && query.length >= 2 && (
        <div ref={contentRef} style={{ flex: 1, overflowY: 'auto', padding: 16, WebkitOverflowScrolling: 'touch' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.80)', marginBottom: 12, fontWeight: 500 }}>
            {searchResults.length} resultado{searchResults.length !== 1 && 's'} para "{query}"
          </div>
          {searchResults.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.70)', fontSize: 14 }}>
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
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>
              {activePart?.num !== '—' ? `Parte ${activePart?.num} · ` : ''}{activePart?.title}
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, fontWeight: 400, color: '#FFFFFF', lineHeight: 0.95, letterSpacing: '0.03em', margin: 0 }}>
              {(typeof activeSection?.n === 'number' || typeof activeSection?.n === 'string') && (
                <span style={{ color: 'rgba(255,255,255,0.60)' }}>{activeSection.n}.&nbsp;</span>
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
              <button onClick={() => navigate(prev.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, padding: '11px 12px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.90)', minWidth: 0, textAlign: 'left' }}>
                <ChevronLeft size={14} style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.3 }}>{prev.title}</span>
              </button>
            ) : <div style={{ flex: 1 }} />}

            {next ? (
              <button onClick={() => navigate(next.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, padding: '11px 12px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.90)', minWidth: 0, textAlign: 'right' }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.3 }}>{next.title}</span>
                <ChevronRight size={14} style={{ flexShrink: 0 }} />
              </button>
            ) : <div style={{ flex: 1 }} />}
          </div>

          {/* Section counter */}
          <div style={{ textAlign: 'center', padding: '12px 0 20px', fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
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
