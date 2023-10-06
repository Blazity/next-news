"use client"
import { ReactNode } from "react"
import { CodeBlock, nord } from "react-code-blocks"

export async function CodeSnippet({ text }: { text: ReactNode }) {
  return (
    <CodeBlock
      language={"javascript"}
      customStyle={{ "border-radius": "15px" }}
      text={String(text)}
      showLineNumbers={true}
      theme={nord}
    />
  )
}
