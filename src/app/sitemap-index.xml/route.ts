import { getServerSideSitemapIndex } from "next-sitemap";
import { env } from "@/env.mjs";
import { HygraphApi } from "@/hygraphApi/hygraphApi";
import { i18n } from "@/i18n/i18n";

const URLS_PER_SITEMAP = 1000;

export async function GET() {
    const locales = i18n.locales;
    const sitemaps: string[] = [];

    for(const locale of locales){
      sitemaps.push(`${env.VERCEL_URL}/${locale}/sitemap.xml`)
    }

    for(const locale of locales){
      const { getArticlesQuantity } = HygraphApi({lang: locale})
      const {articlesConnection: {pageInfo: {pageSize}}} = await getArticlesQuantity({});
      const amountOfSitemapFiles = Math.ceil(pageSize ? pageSize / URLS_PER_SITEMAP : 1);

      const localeSitemaps = Array(amountOfSitemapFiles)
      .fill('')
      .map((v, index) => `${env.VERCEL_URL}/${locale}/${index + 1}/sitemap.xml`);
      
      sitemaps.push(...localeSitemaps)
    }



    return getServerSideSitemapIndex([
        ...sitemaps
      ])
}
