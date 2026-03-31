import { create } from 'zustand'

import type {
  GeoPoint,
  RouteResponse,
  ScenarioPhysics,
  ScenarioType,
  UserWeights,
} from '@/shared/types/domain'
import { DEFAULT_WEIGHTS } from '@/shared/types/domain'

interface AppState {
  // --- Map selection ---
  origin: GeoPoint | null
  destination: GeoPoint | null

  // --- Scenario ---
  scenario: ScenarioType
  scenarioPhysics: ScenarioPhysics | null
  isScenarioLoading: boolean

  // --- Weights (lambda values from the paper) ---
  weights: UserWeights

  // --- Route result ---
  routeResult: RouteResponse | null
  isCalculating: boolean

  // --- Error / toast ---
  error: string | null

  // --- Actions ---
  setOrigin: (point: GeoPoint | null) => void
  setDestination: (point: GeoPoint | null) => void
  resetPoints: () => void

  setScenario: (scenario: ScenarioType) => void
  setScenarioPhysics: (physics: ScenarioPhysics | null) => void
  setScenarioLoading: (loading: boolean) => void

  setWeights: (weights: UserWeights) => void

  setRouteResult: (result: RouteResponse | null) => void
  setCalculating: (calculating: boolean) => void

  setError: (error: string | null) => void
  clearError: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // --- Initial state ---
  origin: null,
  destination: null,

  scenario: 'NORMAL',
  scenarioPhysics: null,
  isScenarioLoading: false,

  weights: DEFAULT_WEIGHTS,

  routeResult: null,
  isCalculating: false,

  error: null,

  // --- Actions ---
  setOrigin: (point) => set({ origin: point }),
  setDestination: (point) => set({ destination: point }),
  resetPoints: () => set({ origin: null, destination: null, routeResult: null }),

  setScenario: (scenario) => set({ scenario }),
  setScenarioPhysics: (physics) => set({ scenarioPhysics: physics }),
  setScenarioLoading: (loading) => set({ isScenarioLoading: loading }),

  setWeights: (weights) => set({ weights }),

  setRouteResult: (result) => set({ routeResult: result }),
  setCalculating: (calculating) => set({ isCalculating: calculating }),

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
