import { useEffect } from 'react'

export function useDebug(values: any[]) {
  useEffect(() => {
    values.forEach((value, index) => {
      if (typeof value === 'object') {
        console.log(`Value at index ${index}:`, JSON.stringify(value, null, 2))
      }
      else {
        console.log(`Value at index ${index}:`, value)
      }
    },
    )
  }, [values])
}
