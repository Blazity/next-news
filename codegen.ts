import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL,
  documents: ["./src/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
}

export default config
