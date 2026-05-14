'use client'

import ReactMarkdown from 'react-markdown'

const C = {
  tinta:       '#0B0F12',
  charcoal:    '#1F2A30',
  steel:       '#6B7A85',
  andes:       '#0E2A3A',
  siembra:     '#1F8A5B',
  siembraSoft: '#E5F4ED',
  border:      '#E2DCCE',
  warning:     '#C8881F',
  error:       '#B33A2A',
}

const SEMAFORO = {
  verde:    { color: '#1F8A5B', bg: '#E5F4ED', border: '#1F8A5B' },
  amarillo: { color: '#8A6400', bg: '#FEF9E7', border: '#C8881F' },
  rojo:     { color: '#B33A2A', bg: '#FDECEA', border: '#B33A2A' },
}

function getSemaforoStyle(text) {
  const t = (typeof text === 'string' ? text : '').toLowerCase()
  if (t.startsWith('verde'))    return SEMAFORO.verde
  if (t.startsWith('amarillo')) return SEMAFORO.amarillo
  if (t.startsWith('rojo'))     return SEMAFORO.rojo
  return null
}

function extractText(children) {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractText).join('')
  if (children?.props?.children) return extractText(children.props.children)
  return ''
}

const components = {
  h2: ({ children }) => {
    const text = extractText(children)
    const sem = getSemaforoStyle(text)
    if (sem) return (
      <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: sem.color, marginTop: 28, marginBottom: 10, paddingBottom: 6, borderBottom: `2px solid ${sem.border}`, background: sem.bg, padding: '6px 10px', borderRadius: '4px 4px 0 0' }}>
        {children}
      </h2>
    )
    return (
      <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: C.steel, marginTop: 28, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${C.border}` }}>
        {children}
      </h2>
    )
  },
  h3: ({ children }) => (
    <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', color: C.andes, marginTop: 22, marginBottom: 8 }}>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: C.charcoal, marginTop: 16, marginBottom: 6 }}>
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p style={{ fontSize: 15, lineHeight: 1.75, color: C.charcoal, marginBottom: 12 }}>
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong style={{ fontWeight: 600, color: C.tinta }}>
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em style={{ fontStyle: 'italic', color: C.charcoal }}>
      {children}
    </em>
  ),
  ul: ({ children }) => (
    <ul style={{ paddingLeft: 0, marginBottom: 12, listStyle: 'none' }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{ paddingLeft: 0, marginBottom: 12, listStyle: 'none', counterReset: 'item' }}>
      {children}
    </ol>
  ),
  li: ({ children, ordered, index }) => (
    <li style={{ position: 'relative', paddingLeft: 20, marginBottom: 6, fontSize: 15, lineHeight: 1.65, color: C.charcoal }}>
      {ordered
        ? <span style={{ position: 'absolute', left: 0, fontSize: 12, fontWeight: 600, color: C.steel, fontFamily: "'JetBrains Mono', monospace" }}>{(index ?? 0) + 1}.</span>
        : <span style={{ position: 'absolute', left: 4, color: C.siembra, fontWeight: 700 }}>·</span>
      }
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{ borderLeft: `2px solid ${C.siembra}`, padding: '8px 12px', margin: '12px 0', background: C.siembraSoft, borderRadius: '0 6px 6px 0' }}>
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '20px 0' }} />
  ),
  code: ({ children }) => (
    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, background: '#F2EEE6', padding: '2px 5px', borderRadius: 4, color: C.charcoal }}>
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, background: '#F2EEE6', padding: 12, borderRadius: 8, overflow: 'auto', marginBottom: 12 }}>
      {children}
    </pre>
  ),
}

export default function ContentRenderer({ content }) {
  return (
    <div className="playbook-content">
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
