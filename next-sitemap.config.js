/** @type {import('next-sitemap').IConfig} */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? "localhost:3000"

module.exports = {
  siteUrl: `https://${SITE_URL}`,
  generateRobotsTxt: true,
  exclude: ["/api/health", "/server-sitemap-index.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/server-sitemap-index.xml`],
  },
}
