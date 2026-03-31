import apiClient from './client'

import type { RouteRequest, RouteResponse } from '@/shared/types/domain'

export async function calculateRoute(request: RouteRequest): Promise<RouteResponse> {
  const response = await apiClient.post<RouteResponse>('/v1/route/calculate', request)
  return response.data
}
