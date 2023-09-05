import { isArray, isObject, values } from "lodash"

export function slateToText(obj: unknown): string {
  if (isObject(obj)) {
    if ("text" in obj && typeof obj["text"] === "string") {
      return obj["text"]
    }
    return values(obj)
      .map(slateToText)
      .reduce((acc, val) => acc + val, "")
  }
  if (isArray(obj)) return obj.map(slateToText).reduce((acc, val) => acc + val, "")
  return ""
}
