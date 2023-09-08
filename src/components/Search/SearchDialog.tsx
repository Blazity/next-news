"use client"

import algoliasearch from "algoliasearch/lite"
import { Button } from "components/ui/Button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "components/ui/Dialog/Dialog"
import { Input } from "components/ui/Input/Input"
import { env } from "env.mjs"
import { Locale } from "i18n"
import type { Hit } from "instantsearch.js"
import debounce from "lodash/debounce"
import { Search } from "lucide-react"
import { ChangeEvent, ReactNode, useMemo, useState } from "react"
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Snippet,
  UseSearchBoxProps,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch"

const algoliaClient = algoliasearch(env.NEXT_PUBLIC_ALGOLIA_API_ID, env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY)

export type SearchDialogProps = {
  lang: Locale
}

function SearchDialogContent({ lang }: SearchDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" rounded-lg bg-gray-50 text-slate-700 shadow-md"
          variant="ghost"
          aria-label="Open search dialog"
          name="Search"
        >
          <div className="flex items-center gap-4 px-1">
            <Search className="h-4 w-4" />
            Search for an article
          </div>
        </Button>
      </DialogTrigger>
      <InstantSearch searchClient={algoliaClient} indexName={`articles-${lang}`}>
        <DialogContent className="bottom-auto top-[10%] translate-y-[0%] sm:max-w-2xl">
          <DialogHeader>
            <DebouncedSearchBox />
          </DialogHeader>

          <Configure attributesToSnippet={["content:20"]} />
          <NoResultsBoundary fallback={<NoResults />}>
            <Hits hitComponent={Hit} className="flex flex-col gap-4 py-2" />
          </NoResultsBoundary>
        </DialogContent>
      </InstantSearch>
    </Dialog>
  )
}

function Hit({ hit }: { hit: Hit<{ title: string; content: string; objectID: string }> }) {
  return (
    <a
      href="/"
      className="ring-offset-background focus-visible:ring-ring inline-flex w-full rounded-md transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
    </a>
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
