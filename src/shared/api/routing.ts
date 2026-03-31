import type { RouteRequest, RouteResponse } from '@/shared/types/domain'

import apiClient from './client'

export async function calculateRoute(request: RouteRequest): Promise<RouteResponse> {
  const response = await apiClient.post<RouteResponse>('/v1/route/calculate', request)
  return response.data
}
