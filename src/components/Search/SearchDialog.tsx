"use client"

import algoliasearch from "algoliasearch/lite"
import type { Hit } from "instantsearch.js"
import debounce from "lodash/debounce"
import { Search } from "lucide-react"
import Link from "next/link"
import { ChangeEvent, ReactNode, useMemo, useState } from "react"
import {
  Configure,
  DynamicWidgets,
  Highlight,
  Hits,
  InstantSearch,
  Menu,
  RefinementList,
  Snippet,
  useInstantSearch,
  useRefinementList,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch"
import { Button } from "@/components/ui/Button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/Dialog/Dialog"
import { Input } from "@/components/ui/Input/Input"
import { env } from "@/env.mjs"
import { Locale } from "@/i18n/i18n"
import { useLocale } from "@/i18n/useLocale"
import { useQueries, useQuery } from "@tanstack/react-query"
import { RefinementCombobox } from "./RefinementCombobox"
import React from "react"
import { Popover } from "../ui/Popover/Popover"

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
      <Popover>
        <InstantSearch searchClient={algoliaClient} indexName={`articles-${lang}`}>
          <DialogContent className="bottom-auto top-[10%] translate-y-[0%] bg-white sm:max-w-2xl">
            <DialogHeader>
              <RefinementCombobox attribute={"tags"} />
              <DebouncedSearchBox />
            </DialogHeader>

            <Configure attributesToSnippet={["content:20"]} />
            <NoResultsBoundary fallback={<NoResults />}>
              <Hits
                hitComponent={(props) => <CustomHit {...props} hit={props.hit as ArticleHit} lang={lang} />}
                className="flex flex-col gap-4 py-2"
              />
            </NoResultsBoundary>
          </DialogContent>
        </InstantSearch>{" "}
      </Popover>
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
      className="inline-flex w-full rounded-md transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <article className="flex cursor-pointer flex-col rounded-md px-4 py-2">
        <Highlight
          attribute="title"
          hit={hit}
          classNames={{
            highlighted: "bg-primary-100",
          }}
        />
        <Snippet
          attribute="content"
          hit={hit}
          classNames={{
            highlighted: "bg-primary-100",
            root: "line-clamp-2 text-slate-600 text-sm",
          }}
        />
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
