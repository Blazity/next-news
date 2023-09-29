import { RichText as HygraphRichText } from "@graphcms/rich-text-react-renderer"
import { EmbedReferences, RichTextContent } from "@graphcms/rich-text-types"
import { Quiz } from "../Quiz/Quiz"

export function RichText({ raw, references }: { raw: RichTextContent; references?: EmbedReferences }) {
  return (
    <HygraphRichText
      content={raw}
      references={references}
      renderers={{
        h1: (props) => <h1 {...props} className="mb-4 text-3xl font-semibold text-gray-900 dark:text-white" />,
        h2: (props) => <h1 {...props} className="mb-4 text-2xl font-semibold text-gray-900  dark:text-white" />,
        h3: (props) => <h3 {...props} className="text-xl font-semibold  dark:text-white" />,
        h4: (props) => <h4 {...props} className="text-lg font-semibold  dark:text-white" />,
        h5: (props) => <h5 {...props} className="text-md font-semibold dark:text-white" />,
        h6: (props) => <h6 {...props} className="text-sm font-semibold dark:text-white" />,
        p: (props) => <p {...props} className="my-4 text-lg text-gray-800 dark:text-white" />,
        ul: (props) => <ul {...props} className="my-4 list-inside list-disc text-lg text-gray-800 dark:text-white" />,
        ol: (props) => (
          <ol {...props} className="my-4 list-inside list-decimal text-lg text-gray-800 dark:text-white" />
        ),
        li: (props) => <li {...props} className="my-2 text-lg text-gray-800 dark:text-white" />,
        code: (props) => (
          <code {...props} className="rounded-md bg-gray-100 p-2 text-sm dark:bg-gray-800 dark:text-white" />
        ),
        code_block: (props) => (
          <pre
            {...props}
            className="overflow-y-scroll rounded-md bg-gray-100 p-2 text-sm dark:bg-gray-800 dark:text-white"
          />
        ),
        embed: {
          Quiz: ({ id, title, question }) => {
            return <Quiz initialQuiz={{ id, title, question }} />
          },
        },
      }}
    />
  )
}
