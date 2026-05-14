import './globals.css'

export const metadata = {
  title: 'Playbook Comercial — Agua Siembra',
  description: 'Manual táctico del equipo comercial de Agua Siembra. Tomas. Sembramos. Cambiamos.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Playbook Comercial',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0E2A3A',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Playbook Comercial" />
      </head>
      <body>{children}</body>
    </html>
  )
}
