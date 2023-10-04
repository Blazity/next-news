"use client"
import { ReactNode } from "react"
import { CodeBlock, tomorrowNightBlue } from "react-code-blocks"

export function CodeSnipet({ text }: { text: ReactNode }) {
  return <CodeBlock text={String(text)} language="javascript" showLineNumbers={false} theme={tomorrowNightBlue} />
}
