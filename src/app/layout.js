import "./globals.css"

export const metadata = {
  title: "ADS RRHH",
  description: "ADS RRHH",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="font-[monserrat]">
      <body>{children}</body>
    </html>
  )
}
