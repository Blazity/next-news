import algolia from "algoliasearch"
import { env } from "@/env.mjs"

export const algoliaClient = algolia(env.NEXT_PUBLIC_ALGOLIA_API_ID, env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY)
