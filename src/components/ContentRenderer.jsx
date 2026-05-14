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

const components = {
  h2: ({ children }) => (
    <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: C.steel, marginTop: 28, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${C.border}` }}>
      {children}
    </h2>
  ),
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
  li: ({ children, ordered }) => (
    <li style={{ position: 'relative', paddingLeft: 18, marginBottom: 6, fontSize: 15, lineHeight: 1.65, color: C.charcoal }}>
      <span style={{ position: 'absolute', left: 4, color: C.siembra, fontWeight: 700 }}>·</span>
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
