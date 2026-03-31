import apiClient from './client'

import type { VehicleList } from '@/shared/types/domain'

export async function getSupply(): Promise<VehicleList> {
  const response = await apiClient.get<VehicleList>('/v1/supply')
  return response.data
}
