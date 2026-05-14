'use client'

const ROLES = [
  { name: 'Cliente',       what: 'Aporta dinero',     who: 'comensales · suscriptores · HoReCa',   ac: '#43B02A', tagColor: '#43B02A' },
  { name: 'Receptor',      what: 'Recibe',            who: 'ecosistemas · especies · cuencas',     ac: '#00B189', tagColor: '#00B189' },
  { name: 'Inversionista', what: 'Aporta capital',    who: 'Crepes & Waffles · Altipal',           ac: '#00AFD7', tagColor: '#00AFD7' },
  { name: 'Colaborador',   what: 'Aporta trabajo',    who: '~40 personas en Guasca',               ac: '#E94B3C', tagColor: '#E94B3C' },
  { name: 'Facilitador',   what: 'Aporta exposición', who: 'meseros · embajadores · aliados',      ac: '#7A3FB8', tagColor: '#7A3FB8' },
  { name: 'Seguidor',      what: 'Aporta cultura',    who: 'la tribu digital',                     ac: '#F2C544', tagColor: '#8A6E0F' },
]

export default function TribuCards() {
  return (
    <div style={{ marginTop: 20 }}>
      {/* Eyebrow label */}
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
        textTransform: 'uppercase', color: '#6B7A85',
        marginBottom: 12,
        fontFamily: "'Inter', sans-serif",
      }}>
        Seis roles · Una misma cuenca
      </div>

      {/* 2-column grid — optimized for mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
      }}>
        {ROLES.map(r => (
          <div key={r.name} style={{
            background: '#FFFFFF',
            border: '1px solid #E2DCCE',
            borderTop: `4px solid ${r.ac}`,
            borderRadius: 12,
            padding: '12px 12px 14px',
            overflow: 'hidden',
            minWidth: 0,
          }}>
            {/* Dot + tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
              <span style={{
                width: 6, height: 6, borderRadius: 9999,
                background: r.ac, display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: r.tagColor,
                fontFamily: "'Inter', sans-serif",
              }}>{r.name}</span>
            </div>

            {/* Role name — Bebas Neue */}
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 26, lineHeight: 0.95,
              letterSpacing: '0.5px',
              color: '#0B0F12',
              marginBottom: 8,
              wordBreak: 'break-word',
            }}>
              {r.name}
            </div>

            {/* What + who */}
            <div style={{
              fontSize: 11, fontWeight: 500, color: '#1F2A30',
              marginBottom: 2, fontFamily: "'Inter', sans-serif",
            }}>
              {r.what}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, color: '#6B7A85', lineHeight: 1.4,
              wordBreak: 'break-word',
            }}>
              {r.who}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
