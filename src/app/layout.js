import "./globals.css"

export const metadata = {
  title: "ADS RRHH",
  description: "ADS RRHH",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
