import "../../styles/tailwind.css"

export default function Layout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
      <body>
        <main className="main mx-auto flex max-w-4xl flex-col items-center justify-start">{children}</main>
      </body>
    </html>
  )
}
