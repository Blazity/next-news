"use client"

import { Check, ChevronsUpDown, X } from "lucide-react"
import * as React from "react"

import { useRefinementList, UseRefinementListProps } from "react-instantsearch"
import { Button } from "@/components/ui/Button/Button"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/Command/Command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover/Popover"
import { cn } from "@/utils/cn"

type RefinementComboboxProps = UseRefinementListProps

export function RefinementCombobox(props: RefinementComboboxProps) {
  const { items, refine } = useRefinementList(props)
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <div className="flex flex-wrap items-start gap-4 pb-4">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[150px] justify-between bg-gray-100 text-gray-400"
          >
            {"Select tag..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {items
          .filter((item) => item.isRefined)
          .map((item) => {
            return (
              <div
                key={`pill-${item.value}`}
                className="flex h-[40px] items-center gap-2 rounded-lg bg-gray-100 px-4 pr-2 text-sm text-black"
              >
                {item.label}
                <Button className="h-[20px] w-[20px] rounded-full p-1 " onClick={() => refine(item.value)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )
          })}
      </div>
      <PopoverContent className="ml-6 w-[200px] bg-white p-0">
        <Command>
          <CommandInput placeholder="Search tags.." />
          <CommandEmpty>No tags found.</CommandEmpty>
          <CommandGroup value={"value"}>
            {items
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((item) => {
                return (
                  <CommandItem
                    key={item.value}
                    className="relative flex cursor-pointer"
                    onSelect={() => {
                      refine(item.value)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", item.isRefined ? "opacity-100" : "opacity-0")} />
                    {item.label}
                    <div className="absolute right-2 min-w-[20px] rounded-full  text-center font-semibold ">
                      {item.count}
                    </div>
                  </CommandItem>
                )
              })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
