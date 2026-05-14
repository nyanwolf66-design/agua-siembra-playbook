'use client'

const FORMATS = [
  {
    nombre: 'Lata 310 ml',
    tag: 'Sin gas · Con gas',
    canal: 'HORECA, eventos, retail, vending',
    claim: 'La única agua mineral en lata del país. Premium, reciclable, y viaja a donde el vidrio no llega.',
    icon: '🥤',
    color: '#00AFD7',
    highlight: 'Primera y única en Colombia',
  },
  {
    nombre: 'Vidrio retornable',
    tag: '280 ml · 477 ml · 750 ml',
    canal: 'HORECA premium, hoteles, cafeterías',
    claim: 'La botella vuelve. Se lava, se rellena, sale de nuevo.',
    icon: '🍾',
    color: '#1F8A5B',
    highlight: 'Retornable · circular',
  },
  {
    nombre: 'PET 500 ml',
    tag: 'Sin gas · Con gas',
    canal: 'Corporativo, oficinas, retail, conveniencia',
    claim: 'Agua mineral natural de páramo en botella hecha con 50% de plástico reciclado.',
    icon: '💧',
    color: '#0E2A3A',
    highlight: '50% rPET reciclado',
  },
  {
    nombre: 'PET 1 L y 1,5 L',
    tag: 'Sin gas · Con gas',
    canal: 'Restaurantes, catering, eventos',
    claim: 'La misma agua de páramo, en un formato que se queda en la mesa.',
    icon: '💧',
    color: '#0E2A3A',
    highlight: 'Mesa · grupos · familias',
  },
  {
    nombre: 'Garrafa 5 L',
    tag: 'Sin gas',
    canal: 'Retail, tiendas de conveniencia, hogares',
    claim: 'La única garrafa de cinco litros de agua mineral natural premium en el mercado.',
    icon: '🫙',
    color: '#C9602F',
    highlight: 'Única en 5 L premium',
  },
  {
    nombre: 'Botellón 20 L',
    tag: 'Retornable',
    canal: 'Hogares, oficinas, embajadas, clubes',
    claim: 'El único botellón de 20 litros de agua mineral natural en Bogotá.',
    icon: '🫧',
    color: '#7A3FB8',
    highlight: 'Único mineral 20 L Bogotá',
  },
]

export default function PortafolioCards() {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
        textTransform: 'uppercase', color: '#6B7A85',
        marginBottom: 12, fontFamily: "'Inter', sans-serif",
      }}>
        6 formatos · Un solo origen
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FORMATS.map(f => (
          <div key={f.nombre} style={{
            background: '#FFFFFF',
            border: '1px solid #E2DCCE',
            borderLeft: `4px solid ${f.color}`,
            borderRadius: 12,
            padding: '14px 14px 14px 16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22, lineHeight: 1, letterSpacing: '0.5px',
                  color: '#0B0F12', marginBottom: 3,
                }}>
                  {f.nombre}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, color: f.color, fontWeight: 600,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  {f.tag}
                </div>
              </div>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                textTransform: 'uppercase', color: f.color,
                background: f.color + '18',
                padding: '3px 8px', borderRadius: 99,
                whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 8,
                fontFamily: "'Inter', sans-serif",
              }}>
                {f.highlight}
              </span>
            </div>

            <div style={{
              fontSize: 11, color: '#6B7A85', marginBottom: 8,
              fontFamily: "'Inter', sans-serif",
            }}>
              <strong style={{ color: '#1F2A30', fontWeight: 600 }}>Canal: </strong>{f.canal}
            </div>

            <div style={{
              fontSize: 12, color: '#1F2A30', lineHeight: 1.5,
              borderLeft: `2px solid ${f.color}`,
              paddingLeft: 10, fontStyle: 'italic',
              fontFamily: "'Inter', sans-serif",
            }}>
              "{f.claim}"
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
