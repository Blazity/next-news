import Script from "next/script"
import { env } from "env.mjs"

export function GoogleAnalytics() {
  return (
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_MEASUREMENT_ID}`} />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${env.GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
