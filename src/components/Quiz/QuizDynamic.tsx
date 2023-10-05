"use client"

import dynamic from "next/dynamic"
import { QuizProps } from "./QuizLogic"

export const QuizDynamic = dynamic<QuizProps>(() => import("./QuizLogic").then((mod) => mod.default))