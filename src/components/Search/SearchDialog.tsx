"use client"

import algoliasearch from "algoliasearch/lite"
import type { Hit } from "instantsearch.js"
import debounce from "lodash/debounce"
import { Search } from "lucide-react"
import Link from "next/link"
import { ChangeEvent, ReactNode, useMemo, useState } from "react"
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Snippet,
  useInstantSearch,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch"
import { Button } from "@/components/ui/Button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/Dialog/Dialog"
import { Input } from "@/components/ui/Input/Input"
import { env } from "@/env.mjs"
import { Locale } from "@/i18n/i18n"
import { useLocale } from "@/i18n/useLocale"
import { ArticlePublishDetails } from "../ArticleCard/ArticlePublishDetails"
import { TagButton } from "../ArticleCard/Buttons/TagButton"

const algoliaClient = algoliasearch(env.NEXT_PUBLIC_ALGOLIA_API_ID, env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY)

function SearchDialogContent() {
  const lang = useLocale()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-lg p-4" variant="ghost" aria-label="Open search dialog" name="Search">
          <Search className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <InstantSearch searchClient={algoliaClient} indexName={`articles-${lang}`}>
        <DialogContent className="bottom-auto top-[10%] translate-y-[0%] overflow-hidden bg-custom-gray-200 sm:max-w-2xl">
          <DialogHeader className="z-10 border-b-[1px] bg-white p-3">
            <DebouncedSearchBox />
          </DialogHeader>

          <Configure attributesToSnippet={["content:20"]} />
          <NoResultsBoundary fallback={<NoResults />}>
            <Hits
              hitComponent={(props) => <CustomHit {...props} hit={props.hit as ArticleHit} lang={lang} />}
              className="-mt-7 h-[400px] overflow-y-auto p-4"
            />
          </NoResultsBoundary>
        </DialogContent>
      </InstantSearch>
    </Dialog>
  )
}

type ArticleHit = Hit<{
  title: string
  content: string
  objectID: string
  slug: string
}>

function CustomHit({ hit, lang }: { hit: ArticleHit; lang: Locale }) {
  return (
    <Link
      href={`/${lang}/article/${hit.slug}`}
      hrefLang={lang}
      prefetch={false}
      className="mt-5 inline-flex w-full rounded-xl border-[1px] bg-white transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <article className="flex cursor-pointer flex-col gap-5 rounded-md p-7">
        <div className="flex items-center gap-2">
          <TagButton variant="light" key={hit.objectID}>
            Tagging
          </TagButton>
          <TagButton variant="light" key={hit.objectID}>
            Tagging
          </TagButton>
          <TagButton variant="light" key={hit.objectID}>
            Tagging
          </TagButton>
        </div>
        <Highlight
          attribute="title"
          hit={hit}
          classNames={{
            highlighted: "bg-primary-100",
            root: "text-xl font-bold",
          }}
        />
        <Snippet
          attribute="content"
          hit={hit}
          classNames={{
            highlighted: "bg-primary-100",
            root: "line-clamp-2 text-md",
          }}
        />
        <ArticlePublishDetails author="Anonymous" variant="light" publicationDate="4 June 2021" />
      </article>
    </Link>
  )
}

function NoResultsBoundary({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const { results } = useInstantSearch()

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    )
  }

  return children
}

function NoResults() {
  const { indexUiState } = useInstantSearch()

  return (
    <div className="flex w-full justify-center px-2 py-4">
      <p className=" text-sm text-slate-600">
        No results for <q>{indexUiState.query}</q>.
      </p>
    </div>
  )
}

const queryHook: UseSearchBoxProps["queryHook"] = (query, search) => {
  search(query)
}

function DebouncedSearchBox() {
  const { refine, query } = useSearchBox({
    queryHook,
  })
  const [inputValue, setInputValue] = useState(query)

  const debouncedRefine = useMemo(() => debounce(refine, 300), [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debouncedRefine(value)
  }

  return <Input type="search" value={inputValue} onChange={onChange} placeholder="Search..." aria-label="Search" />
}

export default SearchDialogContent
