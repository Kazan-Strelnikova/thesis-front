import { useCallback } from 'react'

import { setScenario } from '@/shared/api/simulation'
import { useAppStore } from '@/shared/store/appStore'
import type { ScenarioType } from '@/shared/types/domain'

export function useScenario() {
  const { setScenario: storeSetScenario, setScenarioPhysics, setScenarioLoading, setError } =
    useAppStore()

  const applyScenario = useCallback(
    async (scenario: ScenarioType) => {
      setScenarioLoading(true)
      setError(null)

      try {
        const response = await setScenario({ scenario })
        storeSetScenario(scenario)
        setScenarioPhysics(response.physics)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to set scenario')
      } finally {
        setScenarioLoading(false)
      }
    },
    [storeSetScenario, setScenarioPhysics, setScenarioLoading, setError],
  )

  return { applyScenario }
}
