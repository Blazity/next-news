import algolia from "algoliasearch"
import { env } from "@/env.mjs"

export const algoliaClient = algolia(env.ALGOLIA_API_ID, env.ALGOLIA_API_KEY)
