import { useEffect, useState } from 'react'

import { getSupply } from '@/shared/api/supply'
import type { Vehicle } from '@/shared/types/domain'

const POLL_INTERVAL_MS = 5_000

interface UseSupplyResult {
  vehicles: Vehicle[]
  isLoading: boolean
  error: string | null
}

export function useSupply(): UseSupplyResult {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchOnce() {
      try {
        const data = await getSupply()
        if (!cancelled) {
          setVehicles(data.vehicles)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch vehicles')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    // Fetch immediately, then poll
    void fetchOnce()
    const timer = setInterval(() => void fetchOnce(), POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  return { vehicles, isLoading, error }
}
