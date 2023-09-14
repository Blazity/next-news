"use client"

import dynamic from "next/dynamic"

export const DynamicLangSelect = dynamic(() => import("./LangSelect").then((mod) => mod.default))
