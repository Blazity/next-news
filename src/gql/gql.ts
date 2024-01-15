/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getArticlesQuantity($locales: [Locale!]!) {\n    articlesConnection(locales: $locales) {\n      aggregate {\n        count\n      }\n    }\n  }\n": types.GetArticlesQuantityDocument,
    "\n  query listArticlesForSitemap($locales: [Locale!]!, $skip: Int = 0, $first: Int = 50) {\n    articles(locales: $locales, skip: $skip, first: $first, orderBy: updatedAt_ASC) {\n      slug\n      updatedAt\n      image {\n        data {\n          url\n        }\n      }\n    }\n  }\n": types.ListArticlesForSitemapDocument,
    "\n  query getRecentArticlesQueryWithMain(\n    $locales: [Locale!]!\n    $skip: Int = 0\n    $first: Int = 50\n    $where: ArticleWhereInput\n  ) {\n    mainArticle: articles(locales: $locales, first: 1, orderBy: publishedAt_DESC, where: $where) {\n      ...ArticleCard\n      content {\n        raw\n      }\n    }\n    articles(locales: $locales, skip: $skip, first: $first, orderBy: publishedAt_DESC, where: $where) {\n      ...ArticleCard\n    }\n    articlesConnection(locales: $locales) {\n      aggregate {\n        count\n      }\n    }\n  }\n": types.GetRecentArticlesQueryWithMainDocument,
    "\n  query getRecentArticles($locales: [Locale!]!, $skip: Int = 0, $first: Int = 50, $where: ArticleWhereInput) {\n    articles(locales: $locales, skip: $skip, first: $first, orderBy: publishedAt_DESC, where: $where) {\n      ...ArticleCard\n    }\n    articlesConnection(locales: $locales) {\n      aggregate {\n        count\n      }\n    }\n  }\n": types.GetRecentArticlesDocument,
    "\n  query getArticleRecommendedArticles($locales: [Locale!]!, $id: ID!) {\n    article(locales: $locales, where: { id: $id }) {\n      recommendedArticles {\n        ...ArticleCard\n      }\n    }\n  }\n": types.GetArticleRecommendedArticlesDocument,
    "\n  query getArticleBySlug($locales: [Locale!]!, $slug: String!) {\n    articles(locales: $locales, where: { slug: $slug }) {\n      ...ArticleCard\n      content {\n        raw\n        references {\n          ... on Quiz {\n            id\n          }\n        }\n      }\n\n      categories {\n        title\n        slug\n      }\n    }\n  }\n": types.GetArticleBySlugDocument,
    "\n  query getArticleMetadataBySlugQuery($locales: [Locale!]!, $slug: String!) {\n    articles(locales: $locales, where: { slug: $slug }) {\n      seoComponent {\n        title\n        description {\n          text\n        }\n      }\n      image {\n        ...Image\n      }\n      author {\n        name\n      }\n    }\n  }\n": types.GetArticleMetadataBySlugQueryDocument,
    "\n  query listArticlesBySlug($locales: [Locale!]!, $slugs: [String!]!) {\n    articles(locales: $locales, where: { slug_in: $slugs }) {\n      ...ArticleCard\n    }\n  }\n": types.ListArticlesBySlugDocument,
    "\n  query listArticlesByCategory($locales: [Locale!]!, $categorySlug: String!, $skip: Int = 0, $first: Int = 50) {\n    articles(\n      locales: $locales\n      where: { categories_some: { slug: $categorySlug } }\n      skip: $skip\n      first: $first\n      orderBy: publishedAt_DESC\n    ) {\n      ...ArticleCard\n    }\n    articlesConnection(locales: $locales, where: { categories_some: { slug: $categorySlug } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n": types.ListArticlesByCategoryDocument,
    "\n  query getNavigation($locales: [Locale!]!) {\n    navigations(locales: $locales, first: 1) {\n      elements {\n        element {\n          ... on Category {\n            __typename\n            title\n            slug\n          }\n          ... on Page {\n            __typename\n            title\n            slug\n          }\n        }\n      }\n      logo {\n        url\n      }\n    }\n    footers(locales: $locales, first: 1) {\n      logo {\n        url\n      }\n      additionalLogo {\n        url\n      }\n      ownershipAndCredits\n      companyName\n      youtubeLink\n      twitterLink\n      instagramLink\n      facebookLink\n      contactSection {\n        country\n        city\n        postCode\n        street\n      }\n      links {\n        element {\n          ... on Category {\n            __typename\n            title\n            slug\n          }\n          ... on Page {\n            __typename\n            title\n            slug\n          }\n        }\n      }\n    }\n  }\n": types.GetNavigationDocument,
    "\n  query getHomepage($locales: [Locale!]!) {\n    marketStock\n    homepages(locales: $locales, first: 1) {\n      heroArticle {\n        id\n        author {\n          name\n          avatar {\n            data {\n              url\n            }\n          }\n        }\n        publishedAt\n        locale\n        slug\n        title\n        tags {\n          tag\n        }\n        image {\n          description {\n            text\n          }\n          data {\n            url\n          }\n        }\n      }\n      recentSectionTitle\n      trendingSectionTitle\n      highlightedCategoryTitle\n      highlightedCategory(forceParentLocale: true) {\n        slug\n        title\n        id\n      }\n      highlightedSectionTitle\n      highlightedArticles(forceParentLocale: true) {\n        id\n        author {\n          name\n          avatar {\n            data {\n              url\n            }\n          }\n        }\n        publishedAt\n        locale\n        slug\n        title\n        tags {\n          tag\n        }\n        image {\n          description {\n            text\n          }\n          data {\n            url\n          }\n        }\n      }\n    }\n  }\n": types.GetHomepageDocument,
    "\n  query getHomepageMetadataQuery($locales: [Locale!]!) {\n    homepages(locales: $locales, first: 1) {\n      seoComponent {\n        title\n        description {\n          text\n        }\n      }\n    }\n  }\n": types.GetHomepageMetadataQueryDocument,
    "\n  fragment Author on Author {\n    id\n    name\n    avatar {\n      data {\n        url\n      }\n    }\n  }\n": types.AuthorFragmentDoc,
    "\n  fragment Image on Image {\n    id\n    description {\n      text\n    }\n    data {\n      url\n    }\n  }\n": types.ImageFragmentDoc,
    "\n  fragment ArticleCard on Article {\n    id\n    author {\n      ...Author\n    }\n    publishedAt\n    updatedAt\n    locale\n    slug\n    title\n    tags {\n      tag\n    }\n    image {\n      ...Image\n    }\n  }\n": types.ArticleCardFragmentDoc,
    "\n  query getPageBySlug($locales: [Locale!]!, $slug: String!) {\n    pages(locales: $locales, where: { slug: $slug }) {\n      title\n      content {\n        raw\n      }\n    }\n  }\n": types.GetPageBySlugDocument,
    "\n  query getPageMetadataBySlugQuery($locales: [Locale!]!, $slug: String!) {\n    pages(locales: $locales, where: { slug: $slug }) {\n      seoComponent {\n        title\n        description {\n          text\n        }\n      }\n    }\n  }\n": types.GetPageMetadataBySlugQueryDocument,
    "\n  query listPagesForSitemap($locales: [Locale!]!) {\n    pages(locales: $locales) {\n      slug\n      locale\n    }\n  }\n": types.ListPagesForSitemapDocument,
    "\n  query getQuizQuestionsById($locales: [Locale!]!, $id: ID!, $skip: Int = 0) {\n    quiz(locales: $locales, where: { id: $id }) {\n      title\n      question(skip: $skip) {\n        id\n        content {\n          raw\n        }\n        answer {\n          id\n          content {\n            raw\n          }\n          isValid\n        }\n      }\n    }\n  }\n": types.GetQuizQuestionsByIdDocument,
    "\n  query getGlobalTranslations($locales: [Locale!]!) {\n    translationsSingleton: singleton(where: { key: \"translations\" }, locales: $locales) {\n      translations: model {\n        ... on GlobalTranslations {\n          showMore\n          showing\n          resultsFor\n          searchCategory\n          search\n          selectTag\n          shareOnSocial\n          relatedArticles\n          noTagsFound\n          noResultsFor\n          loading\n        }\n      }\n    }\n  }\n": types.GetGlobalTranslationsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getArticlesQuantity($locales: [Locale!]!) {\n    articlesConnection(locales: $locales) {\n      aggregate {\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query getArticlesQuantity($locales: [Locale!]!) {\n    articlesConnection(locales: $locales) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listArticlesForSitemap($locales: [Locale!]!, $skip: Int = 0, $first: Int = 50) {\n    articles(locales: $locales, skip: $skip, first: $first, orderBy: updatedAt_ASC) {\n      slug\n      updatedAt\n      image {\n        data {\n          url\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query listArticlesForSitemap($locales: [Locale!]!, $skip: Int = 0, $first: Int = 50) {\n    articles(locales: $locales, skip: $skip, first: $first, orderBy: updatedAt_ASC) {\n      slug\n      updatedAt\n      image {\n        data {\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRecentArticlesQueryWithMain(\n    $locales: [Locale!]!\n    $skip: Int = 0\n    $first: Int = 50\n    $where: ArticleWhereInput\n  ) {\n    mainArticle: articles(locales: $locales, first: 1, orderBy: publishedAt_DESC, where: $where) {\n      ...ArticleCard\n      content {\n        raw\n      }\n    }\n    articles(locales: $locales, skip: $skip, first: $first, orderBy: publishedAt_DESC, where: $where) {\n      ...ArticleCard\n    }\n    articlesConnection(locales: $locales) {\n      aggregate {\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRecentArticlesQueryWithMain(\n    $locales: [Locale!]!\n    $skip: Int = 0\n    $first: Int = 50\n    $where: ArticleWhereInput\n  ) {\n    mainArticle: articles(locales: $locales, first: 1, orderBy: publishedAt_DESC, where: $where) {\n      ...ArticleCard\n      content {\n        raw\n      }\n    }\n    articles(locales: $locales, skip: $skip, first: $first, orderBy: publishedAt_DESC, where: $where) {\n      ...ArticleCard\n    }\n    articlesConnection(locales: $locales) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRecentArticles($locales: [Locale!]!, $skip: Int = 0, $first: Int = 50, $where: ArticleWhereInput) {\n    articles(locales: $locales, skip: $skip, first: $first, orderBy: publishedAt_DESC, where: $where) {\n      ...ArticleCard\n    }\n    articlesConnection(locales: $locales) {\n      aggregate {\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRecentArticles($locales: [Locale!]!, $skip: Int = 0, $first: Int = 50, $where: ArticleWhereInput) {\n    articles(locales: $locales, skip: $skip, first: $first, orderBy: publishedAt_DESC, where: $where) {\n      ...ArticleCard\n    }\n    articlesConnection(locales: $locales) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getArticleRecommendedArticles($locales: [Locale!]!, $id: ID!) {\n    article(locales: $locales, where: { id: $id }) {\n      recommendedArticles {\n        ...ArticleCard\n      }\n    }\n  }\n"): (typeof documents)["\n  query getArticleRecommendedArticles($locales: [Locale!]!, $id: ID!) {\n    article(locales: $locales, where: { id: $id }) {\n      recommendedArticles {\n        ...ArticleCard\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getArticleBySlug($locales: [Locale!]!, $slug: String!) {\n    articles(locales: $locales, where: { slug: $slug }) {\n      ...ArticleCard\n      content {\n        raw\n        references {\n          ... on Quiz {\n            id\n          }\n        }\n      }\n\n      categories {\n        title\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query getArticleBySlug($locales: [Locale!]!, $slug: String!) {\n    articles(locales: $locales, where: { slug: $slug }) {\n      ...ArticleCard\n      content {\n        raw\n        references {\n          ... on Quiz {\n            id\n          }\n        }\n      }\n\n      categories {\n        title\n        slug\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getArticleMetadataBySlugQuery($locales: [Locale!]!, $slug: String!) {\n    articles(locales: $locales, where: { slug: $slug }) {\n      seoComponent {\n        title\n        description {\n          text\n        }\n      }\n      image {\n        ...Image\n      }\n      author {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getArticleMetadataBySlugQuery($locales: [Locale!]!, $slug: String!) {\n    articles(locales: $locales, where: { slug: $slug }) {\n      seoComponent {\n        title\n        description {\n          text\n        }\n      }\n      image {\n        ...Image\n      }\n      author {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listArticlesBySlug($locales: [Locale!]!, $slugs: [String!]!) {\n    articles(locales: $locales, where: { slug_in: $slugs }) {\n      ...ArticleCard\n    }\n  }\n"): (typeof documents)["\n  query listArticlesBySlug($locales: [Locale!]!, $slugs: [String!]!) {\n    articles(locales: $locales, where: { slug_in: $slugs }) {\n      ...ArticleCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listArticlesByCategory($locales: [Locale!]!, $categorySlug: String!, $skip: Int = 0, $first: Int = 50) {\n    articles(\n      locales: $locales\n      where: { categories_some: { slug: $categorySlug } }\n      skip: $skip\n      first: $first\n      orderBy: publishedAt_DESC\n    ) {\n      ...ArticleCard\n    }\n    articlesConnection(locales: $locales, where: { categories_some: { slug: $categorySlug } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query listArticlesByCategory($locales: [Locale!]!, $categorySlug: String!, $skip: Int = 0, $first: Int = 50) {\n    articles(\n      locales: $locales\n      where: { categories_some: { slug: $categorySlug } }\n      skip: $skip\n      first: $first\n      orderBy: publishedAt_DESC\n    ) {\n      ...ArticleCard\n    }\n    articlesConnection(locales: $locales, where: { categories_some: { slug: $categorySlug } }) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getNavigation($locales: [Locale!]!) {\n    navigations(locales: $locales, first: 1) {\n      elements {\n        element {\n          ... on Category {\n            __typename\n            title\n            slug\n          }\n          ... on Page {\n            __typename\n            title\n            slug\n          }\n        }\n      }\n      logo {\n        url\n      }\n    }\n    footers(locales: $locales, first: 1) {\n      logo {\n        url\n      }\n      additionalLogo {\n        url\n      }\n      ownershipAndCredits\n      companyName\n      youtubeLink\n      twitterLink\n      instagramLink\n      facebookLink\n      contactSection {\n        country\n        city\n        postCode\n        street\n      }\n      links {\n        element {\n          ... on Category {\n            __typename\n            title\n            slug\n          }\n          ... on Page {\n            __typename\n            title\n            slug\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getNavigation($locales: [Locale!]!) {\n    navigations(locales: $locales, first: 1) {\n      elements {\n        element {\n          ... on Category {\n            __typename\n            title\n            slug\n          }\n          ... on Page {\n            __typename\n            title\n            slug\n          }\n        }\n      }\n      logo {\n        url\n      }\n    }\n    footers(locales: $locales, first: 1) {\n      logo {\n        url\n      }\n      additionalLogo {\n        url\n      }\n      ownershipAndCredits\n      companyName\n      youtubeLink\n      twitterLink\n      instagramLink\n      facebookLink\n      contactSection {\n        country\n        city\n        postCode\n        street\n      }\n      links {\n        element {\n          ... on Category {\n            __typename\n            title\n            slug\n          }\n          ... on Page {\n            __typename\n            title\n            slug\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getHomepage($locales: [Locale!]!) {\n    marketStock\n    homepages(locales: $locales, first: 1) {\n      heroArticle {\n        id\n        author {\n          name\n          avatar {\n            data {\n              url\n            }\n          }\n        }\n        publishedAt\n        locale\n        slug\n        title\n        tags {\n          tag\n        }\n        image {\n          description {\n            text\n          }\n          data {\n            url\n          }\n        }\n      }\n      recentSectionTitle\n      trendingSectionTitle\n      highlightedCategoryTitle\n      highlightedCategory(forceParentLocale: true) {\n        slug\n        title\n        id\n      }\n      highlightedSectionTitle\n      highlightedArticles(forceParentLocale: true) {\n        id\n        author {\n          name\n          avatar {\n            data {\n              url\n            }\n          }\n        }\n        publishedAt\n        locale\n        slug\n        title\n        tags {\n          tag\n        }\n        image {\n          description {\n            text\n          }\n          data {\n            url\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getHomepage($locales: [Locale!]!) {\n    marketStock\n    homepages(locales: $locales, first: 1) {\n      heroArticle {\n        id\n        author {\n          name\n          avatar {\n            data {\n              url\n            }\n          }\n        }\n        publishedAt\n        locale\n        slug\n        title\n        tags {\n          tag\n        }\n        image {\n          description {\n            text\n          }\n          data {\n            url\n          }\n        }\n      }\n      recentSectionTitle\n      trendingSectionTitle\n      highlightedCategoryTitle\n      highlightedCategory(forceParentLocale: true) {\n        slug\n        title\n        id\n      }\n      highlightedSectionTitle\n      highlightedArticles(forceParentLocale: true) {\n        id\n        author {\n          name\n          avatar {\n            data {\n              url\n            }\n          }\n        }\n        publishedAt\n        locale\n        slug\n        title\n        tags {\n          tag\n        }\n        image {\n          description {\n            text\n          }\n          data {\n            url\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getHomepageMetadataQuery($locales: [Locale!]!) {\n    homepages(locales: $locales, first: 1) {\n      seoComponent {\n        title\n        description {\n          text\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getHomepageMetadataQuery($locales: [Locale!]!) {\n    homepages(locales: $locales, first: 1) {\n      seoComponent {\n        title\n        description {\n          text\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Author on Author {\n    id\n    name\n    avatar {\n      data {\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Author on Author {\n    id\n    name\n    avatar {\n      data {\n        url\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Image on Image {\n    id\n    description {\n      text\n    }\n    data {\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment Image on Image {\n    id\n    description {\n      text\n    }\n    data {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ArticleCard on Article {\n    id\n    author {\n      ...Author\n    }\n    publishedAt\n    updatedAt\n    locale\n    slug\n    title\n    tags {\n      tag\n    }\n    image {\n      ...Image\n    }\n  }\n"): (typeof documents)["\n  fragment ArticleCard on Article {\n    id\n    author {\n      ...Author\n    }\n    publishedAt\n    updatedAt\n    locale\n    slug\n    title\n    tags {\n      tag\n    }\n    image {\n      ...Image\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPageBySlug($locales: [Locale!]!, $slug: String!) {\n    pages(locales: $locales, where: { slug: $slug }) {\n      title\n      content {\n        raw\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPageBySlug($locales: [Locale!]!, $slug: String!) {\n    pages(locales: $locales, where: { slug: $slug }) {\n      title\n      content {\n        raw\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPageMetadataBySlugQuery($locales: [Locale!]!, $slug: String!) {\n    pages(locales: $locales, where: { slug: $slug }) {\n      seoComponent {\n        title\n        description {\n          text\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPageMetadataBySlugQuery($locales: [Locale!]!, $slug: String!) {\n    pages(locales: $locales, where: { slug: $slug }) {\n      seoComponent {\n        title\n        description {\n          text\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query listPagesForSitemap($locales: [Locale!]!) {\n    pages(locales: $locales) {\n      slug\n      locale\n    }\n  }\n"): (typeof documents)["\n  query listPagesForSitemap($locales: [Locale!]!) {\n    pages(locales: $locales) {\n      slug\n      locale\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getQuizQuestionsById($locales: [Locale!]!, $id: ID!, $skip: Int = 0) {\n    quiz(locales: $locales, where: { id: $id }) {\n      title\n      question(skip: $skip) {\n        id\n        content {\n          raw\n        }\n        answer {\n          id\n          content {\n            raw\n          }\n          isValid\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getQuizQuestionsById($locales: [Locale!]!, $id: ID!, $skip: Int = 0) {\n    quiz(locales: $locales, where: { id: $id }) {\n      title\n      question(skip: $skip) {\n        id\n        content {\n          raw\n        }\n        answer {\n          id\n          content {\n            raw\n          }\n          isValid\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGlobalTranslations($locales: [Locale!]!) {\n    translationsSingleton: singleton(where: { key: \"translations\" }, locales: $locales) {\n      translations: model {\n        ... on GlobalTranslations {\n          showMore\n          showing\n          resultsFor\n          searchCategory\n          search\n          selectTag\n          shareOnSocial\n          relatedArticles\n          noTagsFound\n          noResultsFor\n          loading\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getGlobalTranslations($locales: [Locale!]!) {\n    translationsSingleton: singleton(where: { key: \"translations\" }, locales: $locales) {\n      translations: model {\n        ... on GlobalTranslations {\n          showMore\n          showing\n          resultsFor\n          searchCategory\n          search\n          selectTag\n          shareOnSocial\n          relatedArticles\n          noTagsFound\n          noResultsFor\n          loading\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;