'use client'

import { useState } from 'react'

const ROLES = [
  {
    name: 'Cliente',
    what: 'Aporta dinero',
    who: 'comensales · suscriptores · HoReCa',
    ac: '#43B02A', tagColor: '#43B02A',
    detail: 'Contribuyen dinero a través de la compra del producto. Incluye al comensal que pide agua en un restaurante, al gerente de compras de un hotel, al hogar que recibe su botellón por suscripción, a la empresa que abastece su oficina. La relación arranca como transaccional, pero el trabajo comercial consiste en convertirla en algo más: que el cliente entienda el ciclo, lo valore y lo elija conscientemente.',
  },
  {
    name: 'Receptor',
    what: 'Recibe',
    who: 'ecosistemas · especies · cuencas',
    ac: '#00B189', tagColor: '#00B189',
    detail: 'Contribuyen exposición como beneficiarios de los programas ambientales y sociales. Incluye los ecosistemas, cuencas, especies y comunidades cuyas historias la empresa documenta y visibiliza. Su presencia en el relato de la marca es lo que convierte una venta en un acto con propósito.',
  },
  {
    name: 'Inversionista',
    what: 'Aporta capital',
    who: 'Crepes & Waffles · Altipal',
    ac: '#00AFD7', tagColor: '#00AFD7',
    detail: 'Contribuyen dinero a través de inversión con expectativa de retorno. Crepes & Waffles es inversionista y cliente ancla simultáneamente. Altipal opera como inversionista y como facilitador de distribución. La comunicación con ellos integra información financiera y de impacto: los números del negocio y los números de la siembra van juntos.',
  },
  {
    name: 'Colaborador',
    what: 'Aporta trabajo',
    who: '~40 personas en Guasca',
    ac: '#E94B3C', tagColor: '#E94B3C',
    detail: 'Contribuyen trabajo como empleados de la empresa. Son aproximadamente 40 personas entre la planta de Guasca y la operación en Bogotá. Son la primera audiencia de la marca: si un texto interno no los convence, ningún texto externo va a funcionar.',
  },
  {
    name: 'Facilitador',
    what: 'Aporta exposición',
    who: 'meseros · embajadores · aliados',
    ac: '#7A3FB8', tagColor: '#7A3FB8',
    detail: 'Contribuyen trabajo y exposición como intermediarios que llevan el producto al consumidor. Incluye meseros, bartenders, sommeliers, chefs que recomiendan el agua en carta, embajadores de marca y aliados como Altipal. Necesitan herramientas concretas de storytelling: argumentos cortos, datos memorables, guiones de servicio.',
  },
  {
    name: 'Seguidor',
    what: 'Aporta cultura',
    who: 'la tribu digital',
    ac: '#F2C544', tagColor: '#8A6E0F',
    detail: 'Contribuyen exposición como audiencia digital. Se conectan con la marca a través de contenido, reconocimiento y participación cultural. La aspiración es que los seguidores no sean un nicho ambientalista sino corriente principal: gente que quiere ser vista con la marca porque la marca es deseable.',
  },
]

export default function TribuCards() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
        textTransform: 'uppercase', color: '#6B7A85',
        marginBottom: 12, fontFamily: "'Inter', sans-serif",
      }}>
        Seis roles · Una misma cuenca
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {ROLES.map(r => {
          const isOpen = expanded === r.name
          return (
            <div
              key={r.name}
              onClick={() => setExpanded(isOpen ? null : r.name)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2DCCE',
                borderTop: `4px solid ${r.ac}`,
                borderRadius: 12,
                padding: '12px 12px 14px',
                overflow: 'hidden',
                minWidth: 0,
                cursor: 'pointer',
                transition: 'box-shadow 120ms ease',
                boxShadow: isOpen ? '0 4px 14px rgba(0,0,0,0.10)' : 'none',
              }}
            >
              {/* Tag */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 9999, background: r.ac, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: r.tagColor, fontFamily: "'Inter', sans-serif" }}>
                    {r.name}
                  </span>
                </div>
                <span style={{ fontSize: 10, color: '#94A0AA', lineHeight: 1 }}>
                  {isOpen ? '−' : '+'}
                </span>
              </div>

              {/* Role name */}
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, lineHeight: 0.95, letterSpacing: '0.5px', color: '#0B0F12', marginBottom: 8, wordBreak: 'break-word' }}>
                {r.name}
              </div>

              {/* What + who — always visible */}
              <div style={{ fontSize: 11, fontWeight: 500, color: '#1F2A30', marginBottom: 2, fontFamily: "'Inter', sans-serif" }}>
                {r.what}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#6B7A85', lineHeight: 1.4, wordBreak: 'break-word' }}>
                {r.who}
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${r.ac}30`, fontSize: 12, color: '#1F2A30', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                  {r.detail}
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
