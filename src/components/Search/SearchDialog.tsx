"use client"

import algoliasearch from "algoliasearch/lite"
import { Button } from "components/ui/Button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "components/ui/Dialog/Dialog"
import { Input } from "components/ui/Input/Input"
import { env } from "env.mjs"
import type { Hit } from "instantsearch.js"
import debounce from "lodash/debounce"
import { Search } from "lucide-react"
import { ChangeEvent, useMemo, useState } from "react"
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Snippet,
  UseSearchBoxProps,
  useSearchBox,
} from "react-instantsearch"

const algoliaClient = algoliasearch(env.NEXT_PUBLIC_ALGOLIA_API_ID, env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY)

export type SearchDialogProps = {
  index: string
}

function SearchDialogContent({ index }: { index: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" rounded-full bg-gray-50 text-slate-700 shadow-md"
          variant="ghost"
          aria-label="Open search dialog"
        >
          <div className="flex items-center gap-4 px-1">
            <Search className="h-4 w-4" />
            Search for an article
          </div>
        </Button>
      </DialogTrigger>
      <InstantSearch searchClient={algoliaClient} indexName={index}>
        <DialogContent className="bottom-auto top-[10%] translate-y-[0%] sm:max-w-2xl">
          <DialogHeader>
            <DebouncedSearchBox />
          </DialogHeader>

          <Configure attributesToSnippet={["content:20"]} />

          <Hits hitComponent={Hit} className="flex flex-col gap-4 py-2" />
        </DialogContent>
      </InstantSearch>
    </Dialog>
  )
}

function Hit({ hit }: { hit: Hit<{ title: string; content: string; objectID: string }> }) {
  return (
    <a>
      <article className="flex cursor-pointer flex-col rounded-md px-4 py-2 hover:bg-slate-100">
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
