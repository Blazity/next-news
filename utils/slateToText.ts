import { isArray, isObject, isString, values } from "lodash"

export function slateToText(obj: unknown): string {
  if (isObject(obj))
    return values(obj)
      .map(slateToText)
      .reduce((acc, val) => acc + val, "")
  if (isArray(obj)) return obj.map(slateToText).reduce((acc, val) => acc + val, "")
  if (isString(obj)) return obj
  return ""
}
