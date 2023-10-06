"use client"

import dynamic from "next/dynamic"
import { CodeSnippetProps } from "./CodeSnippet"

export const CodeSnippetDynamic = dynamic<CodeSnippetProps>(() => import("./CodeSnippet").then((mod) => mod.default))
