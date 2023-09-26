"use client"

import dynamic from "next/dynamic"
import { CategoryArticlesInfiniteProps } from "./CategoryArticlesInfinite"

export const CategoryArticlesInfiniteDynamic = dynamic<CategoryArticlesInfiniteProps>(() =>
  import("./CategoryArticlesInfinite").then((mod) => mod.default)
)
