import { env } from "@/env.mjs";
import { i18n } from "@/i18n/i18n";
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: env.VERCEL_URL,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    i18n: {
      locales: i18n.locales,
      defaultLocale: i18n.defaultLocale,
    },
    additionalSitemaps: [`${env.VERCEL_URL}/sitemap-index.xml`]
  };