"use client"

import dynamic from "next/dynamic"
import type { SearchDialogProps } from "./SearchDialog"

export const DynamicSearchDialog = dynamic<SearchDialogProps>(() => import("./SearchDialog").then((mod) => mod.default))
