import "../styles/tailwind.css"

import "../canvas"

export default function Web({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="main">{children}</main>
      </body>
    </html>
  )
}
