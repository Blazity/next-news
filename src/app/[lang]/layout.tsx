import "../../styles/tailwind.css"
import { GoogleAnalytics } from "./GoogleAnalytics"

export default function Layout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
      <GoogleAnalytics />
      <body>
        <main className="main mx-auto flex max-w-4xl flex-col items-center justify-start">{children}</main>
      </body>
    </html>
  )
}
