"use client"

import dynamic from "next/dynamic"
import type { RecentArticlesInfiniteProps } from "./RecentArticlesInfinite"

export const RecentArticlesInfiniteDynamic = dynamic<RecentArticlesInfiniteProps>(() =>
  import("./RecentArticlesInfinite").then((mod) => mod.default)
)
