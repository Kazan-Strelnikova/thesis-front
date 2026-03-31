import type { ScenarioRequest, ScenarioResponse } from '@/shared/types/domain'

import apiClient from './client'

export async function setScenario(request: ScenarioRequest): Promise<ScenarioResponse> {
  const response = await apiClient.post<ScenarioResponse>('/v1/simulation/scenario', request)
  return response.data
}
