import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"
import withNextIntl from "next-intl/plugin"
import { env } from "./src/env.mjs"

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins(
  [[withBundleAnalyzer({ enabled: env.ANALYZE })]],
  withNextIntl("./i18n.ts")({
    reactStrictMode: true,
    experimental: { instrumentationHook: true },
    rewrites() {
      return {
        beforeFiles: [
          { source: "/healthz", destination: "/api/health" },
          { source: "/api/healthz", destination: "/api/health" },
          { source: "/health", destination: "/api/health" },
          { source: "/ping", destination: "/api/health" },
        ],
      }
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**.graphassets.com",
        }
      ],
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/i,
        use: ["@svgr/webpack"],
      })
      return config
    },
  })
)

export default config
