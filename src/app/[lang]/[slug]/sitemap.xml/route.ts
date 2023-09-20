import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { HygraphApi } from "@/hygraphApi/hygraphApi";
import { Locale } from '@/i18n/i18n';

const MAX_ARTICLES_PER_SITEMAP = 1000;

async function generateSitemapFields(locale: string, pageNo: number) {
    const skip = (pageNo - 1) * MAX_ARTICLES_PER_SITEMAP;
    const { getRecentArticlesWithMetadata } = HygraphApi({lang: locale as Locale})
    const { articles } = await getRecentArticlesWithMetadata({ skip, first: MAX_ARTICLES_PER_SITEMAP });

    const mappedArticles = articles.map(article => ({
        loc: `/${locale}/articles/${article.slug}`,
        lastModified: article.updatedAt, 
        priority: 0.6,
        changefreq: 'daily',
    }));
  
    return  mappedArticles as ISitemapField[];
}

export async function GET(request: Request, { params }: { params: { lang: string, slug: string } }) {
    const pageNo = +params.slug || 1;
    const sitemapFields = await generateSitemapFields(params.lang, pageNo);

    const headers = {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
        'Content-Type': 'application/xml'
    };

    return getServerSideSitemap(sitemapFields, headers);
}
