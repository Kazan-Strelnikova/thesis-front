import { useCallback } from 'react'
import axios from 'axios'

import { calculateRoute } from '@/shared/api/routing'
import { useAppStore } from '@/shared/store/appStore'

export function useRoute() {
  const { origin, destination, weights, setRouteResult, setCalculating, setError } =
    useAppStore()

  const calculate = useCallback(async () => {
    if (!origin || !destination) {
      setError('Please set both origin and destination on the map.')
      return
    }

    setCalculating(true)
    setError(null)

    try {
      const result = await calculateRoute({ origin, destination, weights })
      setRouteResult(result)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError(
            'No feasible route found. Try relaxing constraints or changing the scenario.',
          )
        } else if (err.response?.status === 422) {
          setError('Invalid request. Check that weights are valid.')
        } else {
          setError(`Server error: ${err.response?.status ?? 'unknown'}`)
        }
      } else {
        setError(err instanceof Error ? err.message : 'Failed to calculate route')
      }
      setRouteResult(null)
    } finally {
      setCalculating(false)
    }
  }, [origin, destination, weights, setRouteResult, setCalculating, setError])

  return { calculate }
}
