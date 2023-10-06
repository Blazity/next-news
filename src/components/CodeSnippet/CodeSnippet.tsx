"use client"
import { ReactNode } from "react"
import { CodeBlock, nord } from "react-code-blocks"

export async function CodeSnippet({ content }: { content: ReactNode }) {
  return (
    <CodeBlock
      language={"javascript"}
      customStyle={{ "border-radius": "15px" }}
      text={String(content)}
      showLineNumbers={true}
      theme={nord}
    />
  )
}
