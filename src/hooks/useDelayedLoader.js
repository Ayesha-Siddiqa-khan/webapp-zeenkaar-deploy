import { useEffect, useState } from 'react'

export function useDelayedLoader(delay = 600) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return isLoading
}
