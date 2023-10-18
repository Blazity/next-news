"use client"
import { ReactNode } from "react"
import { CodeBlock, nord } from "react-code-blocks"

export type CodeSnippetProps = { content: ReactNode }

function CodeSnippet({ content }: CodeSnippetProps) {
  return (
    <CodeBlock
      language={"javascript"}
      customStyle={{ borderRadius: "15px" }}
      text={String(content ?? "")}
      showLineNumbers={true}
      theme={nord}
    />
  )
}

export default CodeSnippet
