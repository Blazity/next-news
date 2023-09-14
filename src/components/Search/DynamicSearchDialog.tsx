"use client"

import dynamic from "next/dynamic"

export const DynamicSearchDialog = dynamic(() => import("./SearchDialog").then((mod) => mod.default))
