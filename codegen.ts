import { CodegenConfig } from "@graphql-codegen/cli"
import { loadEnvConfig } from "@next/env"

loadEnvConfig(process.cwd())

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL,
  documents: ["src/**/*.{gql,graphql,ts,tsx}", "!src/gql/**/*"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [],
      config: {
        skipTypename: true,
        useTypeImports: true,
      },
    },
  },
}

export default config
