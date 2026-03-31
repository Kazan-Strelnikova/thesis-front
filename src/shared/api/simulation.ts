import apiClient from './client'

import type { ScenarioRequest, ScenarioResponse } from '@/shared/types/domain'

export async function setScenario(request: ScenarioRequest): Promise<ScenarioResponse> {
  const response = await apiClient.post<ScenarioResponse>(
    '/v1/simulation/scenario',
    request,
  )
  return response.data
}
