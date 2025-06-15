/**
 * Safely parse JSON string or return default value
 */
export function safeParseJSON<T>(jsonString: string | null | undefined, defaultValue: T): T {
  if (!jsonString) return defaultValue

  try {
    return JSON.parse(jsonString) as T
  } catch (error) {
    console.error("Error parsing JSON:", error)
    return defaultValue
  }
}

/**
 * Convert PostgreSQL array to JavaScript array
 * Handles both native arrays and JSON string arrays
 */
export function convertPgArrayToJsArray(pgArray: any): string[] {
  if (!pgArray) return []

  // If it's already an array, return it
  if (Array.isArray(pgArray)) return pgArray

  // If it's a string that looks like a JSON array, try to parse it
  if (typeof pgArray === "string" && pgArray.startsWith("[") && pgArray.endsWith("]")) {
    try {
      return JSON.parse(pgArray)
    } catch (error) {
      console.error("Error parsing JSON array:", error)
    }
  }

  // If it's a PostgreSQL array string like {item1,item2}
  if (typeof pgArray === "string" && pgArray.startsWith("{") && pgArray.endsWith("}")) {
    return pgArray
      .substring(1, pgArray.length - 1)
      .split(",")
      .map((item) => item.replace(/^"(.*)"$/, "$1")) // Remove quotes if present
  }

  // Fallback
  return []
}

/**
 * Prepare array data for database storage
 * Converts JavaScript arrays to the format expected by the database
 */
export function prepareArrayForDb(array: any[], isJsonb = false): any {
  if (!array || !Array.isArray(array)) return isJsonb ? "[]" : []

  return isJsonb ? JSON.stringify(array) : array
}
