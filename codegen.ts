import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: process.env.HYGRAPH_CONTENT_API_URL,
  documents: ["./client/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
    },
  },
}

export default config
