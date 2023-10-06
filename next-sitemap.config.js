/** @type {import('next-sitemap').IConfig} */

const SITE_URL =
  `https://${process.env.NEXT_PUBLIC_SITE_URL}` ?? `https://${process.env.VERCEL_URL}` ?? "http://localhost:3000"

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ["/api/health", "/server-sitemap-index.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/server-sitemap-index.xml`],
  },
}
