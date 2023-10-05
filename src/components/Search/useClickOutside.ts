"use client"

import { RefObject, useEffect, useRef } from "react"
type ListenerEvent = MouseEvent & {
  target: Element
}
export const useClickOutside = (ref: RefObject<HTMLElement>, callback: (event: MouseEvent) => void) => {
  const handlerRef = useRef(callback)
  useEffect(() => {
    handlerRef.current = callback
  })
  useEffect(() => {
    const listener = (event: ListenerEvent) => {
      if (ref && ref.current) {
        if (event.target.shadowRoot) {
          if (!event.target.shadowRoot.contains(ref.current)) {
            handlerRef.current(event)
          }
        } else {
          if (!ref.current.contains(event.target)) {
            handlerRef.current(event)
          }
        }
      }
    }
    document.addEventListener("click", listener as (e: MouseEvent) => void)
    return () => {
      document.removeEventListener("click", listener as (e: MouseEvent) => void)
    }
  })
}
