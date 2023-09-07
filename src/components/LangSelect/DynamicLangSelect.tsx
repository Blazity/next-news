"use client"

import dynamic from "next/dynamic"
import type { LangSelectProps } from "./LangSelect"

export const DynamicLangSelect = dynamic<LangSelectProps>(() => import("./LangSelect").then((mod) => mod.default))
