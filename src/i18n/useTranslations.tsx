"use client"
import { createContext, ReactNode, useContext } from "react"
import { GlobalTranslations } from "./setTranslations"

const TranslationsContext = createContext<GlobalTranslations | null>(null)

export const TranslationsProvider = ({
  children,
  translations,
}: {
  children: ReactNode
  translations: GlobalTranslations
}) => {
  return <TranslationsContext.Provider value={translations}>{children}</TranslationsContext.Provider>
}

export const useTranslations = () => {
  const context = useContext(TranslationsContext)
  if (!context) {
    throw new Error("useTranslations must be used within a TranslationsProvider")
  }

  return context
}
