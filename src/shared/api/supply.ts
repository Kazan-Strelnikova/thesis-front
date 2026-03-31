import type { VehicleList } from '@/shared/types/domain'

import apiClient from './client'

export async function getSupply(): Promise<VehicleList> {
  const response = await apiClient.get<VehicleList>('/v1/supply')
  return response.data
}
