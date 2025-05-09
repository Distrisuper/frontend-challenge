import { useState, useEffect } from "react"

interface FetchResponse<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export default function useFetch<T>(url: string): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    setLoading(true)

    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data: T) => setData(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Llamada cancelada por el cliente.")
        } else {
          setError(error.message)
        }
      })
      .finally(() => setLoading(false))

    return () => abortController.abort()
  }, [url])

  return { data, loading, error }
}