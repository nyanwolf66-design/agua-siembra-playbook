'use client'

import { useState } from 'react'

const FORMATS = [
  {
    nombre: 'Lata 310 ml',
    tag: 'Sin gas · Con gas',
    canal: 'HORECA, eventos, retail, vending',
    claim: 'La única agua mineral en lata del país. Premium, reciclable, y viaja a donde el vidrio no llega.',
    color: '#43B02A',
    highlight: 'Reciclable',
    img: '/lata-310.png',
    detail: 'Primera y única agua mineral en lata de Colombia. Aluminio 100% reciclable que puede convertirse en un nuevo envase en 60 días. La lata fue desarrollada para desbloquear ciudades donde la logística del vidrio no es viable: es el formato que permite la expansión geográfica.',
  },
  {
    nombre: 'Vidrio 477 ml',
    tag: 'Sin gas · Con gas',
    canal: 'HORECA premium, hoteles boutique, cafeterías especializadas',
    claim: 'La botella vuelve. Se lava, se rellena, sale de nuevo. Uno de los pocos sistemas de retornabilidad en vidrio para agua mineral en la región.',
    color: '#00AFD7',
    highlight: 'Retornable · circular',
    img: '/vidrio-477.png',
    detail: 'El formato que cierra el ciclo del envase. Las botellas se recogen en los puntos de venta, regresan a la planta de Guasca, se lavan, se inspeccionan y vuelven a la línea de producción. La planta lava actualmente el 10% del vidrio puesto en el mercado, con meta de 25% en 2026. El vidrio retornable genera contacto recurrente con el punto de venta por la logística de recogida.',
  },
  {
    nombre: 'Vidrio 750 ml',
    tag: 'Sin gas · Con gas',
    canal: 'HORECA premium, hoteles boutique, cafeterías especializadas',
    claim: 'La botella vuelve. Se lava, se rellena, sale de nuevo. Uno de los pocos sistemas de retornabilidad en vidrio para agua mineral en la región.',
    color: '#00AFD7',
    highlight: 'Retornable · circular',
    img: '/vidrio-750.png',
    detail: 'El formato que cierra el ciclo del envase. Las botellas se recogen en los puntos de venta, regresan a la planta de Guasca, se lavan, se inspeccionan y vuelven a la línea de producción. La planta lava actualmente el 10% del vidrio puesto en el mercado, con meta de 25% en 2026. El 750 ml es una botella elegante diseñada para servicio a la mesa en restaurantes premium. El vidrio retornable genera contacto recurrente con el punto de venta por la logística de recogida.',
  },
  {
    nombre: 'PET 500 ml',
    tag: 'Sin gas · Con gas',
    canal: 'Corporativo, oficinas, coworkings, retail, conveniencia',
    claim: 'Agua mineral natural de páramo en botella hecha con 50% de plástico reciclado. Hidratación diaria con origen y propósito.',
    color: '#7A3FB8',
    highlight: 'rPET 50% reciclado',
    img: '/pet-500.png',
    detail: 'Fabricado con 50% de resina reciclada (rPET). La empresa prioriza PET sobre PVC y trabaja en incrementar el porcentaje de reciclado.',
  },
  {
    nombre: 'PET 1 L y 1,5 L',
    tag: 'Sin gas · Con gas',
    canal: 'Restaurantes, catering, eventos',
    claim: 'La misma agua de páramo, en un formato que se queda en la mesa y acompaña toda la comida.',
    color: '#7A3FB8',
    highlight: 'rPET 50% reciclado',
    img: '/pet-1l.png',
    detail: 'Presencia en mesa para formatos de mayor volumen. Ideal para servicio en restaurantes cuando los comensales son grupos o familias, catering y eventos donde se requiere cantidad sin sacrificar origen.',
  },
  {
    nombre: 'Garrafa 5 L',
    tag: 'Sin gas',
    canal: 'Retail, tiendas de conveniencia, hogares',
    claim: 'La única garrafa de cinco litros de agua mineral natural premium en el mercado.',
    color: '#8A6E0F',
    highlight: 'Reciclable',
    detail: 'El formato "premium diario": agua mineral natural de páramo en un tamaño que funciona para el consumo frecuente en casa. Mercado en formación, con competencia limitada a marcas propias de retailers. Sin competidor directo en la categoría de agua mineral natural premium en este formato.',
  },
  {
    nombre: 'Botellón 20 L',
    tag: 'Sin gas',
    canal: 'Hogares (suscripción), oficinas, embajadas, clubes privados',
    claim: 'El único botellón de 20 litros de agua mineral natural en Bogotá. Lo que otros llaman agua purificada, nosotros lo hacemos mineral y de páramo.',
    color: '#E94B3C',
    highlight: 'Retornable · circular',
    detail: 'Único botellón de agua mineral natural premium retornable en Bogotá. El mercado de 20 litros está dominado por aguas tratadas purificadas. El sistema de retorno es 100% circular: se entrega, se consume, se recoge, se rellena.',
  },
]

export default function PortafolioCards() {
  const [expanded, setExpanded] = useState(null)

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
        {FORMATS.map(f => {
          const isOpen = expanded === f.nombre
          return (
            <div
              key={f.nombre}
              onClick={() => setExpanded(isOpen ? null : f.nombre)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2DCCE',
                borderLeft: `4px solid ${f.color}`,
                borderRadius: 12,
                padding: '14px 14px 14px 16px',
                cursor: 'pointer',
                transition: 'box-shadow 120ms ease',
                boxShadow: isOpen ? '0 4px 14px rgba(0,0,0,0.10)' : 'none',
              }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0, marginLeft: 8 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                    textTransform: 'uppercase', color: f.color,
                    background: f.color + '18',
                    padding: '3px 8px', borderRadius: 99,
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {f.highlight}
                  </span>
                  <span style={{ fontSize: 12, color: '#94A0AA', lineHeight: 1 }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
              </div>

              {/* Expanded content */}
              {isOpen && (
                <div style={{ marginTop: 10 }}>
                  {/* Product image */}
                  {f.img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={f.img}
                      alt={f.nombre + ' Agua Siembra'}
                      style={{
                        width: '100%', borderRadius: 8, marginBottom: 12,
                        display: 'block', objectFit: 'cover',
                      }}
                    />
                  )}
                  {/* Canal */}
                  <div style={{
                    fontSize: 13, color: '#6B7A85',
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: 8,
                  }}>
                    <strong style={{ color: '#1F2A30', fontWeight: 600 }}>Canal: </strong>{f.canal}
                  </div>
                  <div style={{
                    fontSize: 14, color: '#1F2A30', lineHeight: 1.65,
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: 12,
                  }}>
                    {f.detail}
                  </div>
                  <div style={{
                    fontSize: 13, color: '#1F2A30', lineHeight: 1.55,
                    borderLeft: `2px solid ${f.color}`,
                    paddingLeft: 10, fontStyle: 'italic',
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    "{f.claim}"
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ fontSize: 10, color: '#94A0AA', textAlign: 'center', marginTop: 12, fontFamily: "'Inter', sans-serif" }}>
        Toca cada tarjeta para ver más
      </div>
    </div>
  )
}
