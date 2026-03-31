/**
 * Clean domain types for the Innopolis Multimodal Transit API.
 * These mirror the backend Pydantic schemas and domain enums exactly.
 */

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export type ScenarioType =
  | 'NORMAL'
  | 'MORNING_PEAK'
  | 'EVENING_OFFPEAK'
  | 'RAINY_WEATHER'
  | 'CITY_EVENT'
  | 'MAJOR_ACCIDENT'

export type TransportMode = 'WALK' | 'SCOOTER' | 'CARPOOL'

export type VehicleType = 'SCOOTER' | 'CARPOOL_DRIVER'

export type VehicleStatus = 'AVAILABLE' | 'IN_USE' | 'LOW_BATTERY'

export type SolverStatus = 'OPTIMAL' | 'INFEASIBLE' | 'ERROR'

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

export interface GeoPoint {
  lat: number
  lon: number
}

export interface UserWeights {
  w_time: number
  w_cost: number
  w_emissions: number
  w_comfort: number
}

// ---------------------------------------------------------------------------
// Supply
// ---------------------------------------------------------------------------

export interface Vehicle {
  id: string
  type: VehicleType
  lat: number
  lon: number
  battery_level?: number
  status?: VehicleStatus | string
}

export interface VehicleList {
  timestamp: string
  vehicles: Vehicle[]
}

// ---------------------------------------------------------------------------
// Routing
// ---------------------------------------------------------------------------

export interface RouteRequest {
  origin: GeoPoint
  destination: GeoPoint
  weights: UserWeights
}

export interface RouteMetrics {
  total_time_min: number
  total_price_rub: number
  total_emissions_g: number
  satisfaction_score: number
  solve_time_s: number
}

export interface RouteSegment {
  mode: TransportMode
  distance_km: number
  duration_min: number
  instruction: string
  geometry: [number, number][]
}

export interface RouteResponse {
  status: SolverStatus
  metrics: RouteMetrics
  segments: RouteSegment[]
}

// ---------------------------------------------------------------------------
// Simulation
// ---------------------------------------------------------------------------

export interface ScenarioRequest {
  scenario: ScenarioType
}

export interface ScenarioPhysics {
  speed_multiplier: number
  demand_multiplier: number
  emission_multiplier: number
  capacity_multiplier: number
}

export interface ScenarioResponse {
  message: string
  scenario_id: string
  physics: ScenarioPhysics
}

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------

export const SCENARIO_LABELS: Record<ScenarioType, string> = {
  NORMAL: 'Normal',
  MORNING_PEAK: 'Morning Peak',
  EVENING_OFFPEAK: 'Evening Off-Peak',
  RAINY_WEATHER: 'Rainy Weather',
  CITY_EVENT: 'City Event',
  MAJOR_ACCIDENT: 'Major Accident',
}

export const SCENARIO_ICONS: Record<ScenarioType, string> = {
  NORMAL: '☀️',
  MORNING_PEAK: '🌅',
  EVENING_OFFPEAK: '🌆',
  RAINY_WEATHER: '🌧️',
  CITY_EVENT: '🎉',
  MAJOR_ACCIDENT: '🚨',
}

export const MODE_COLORS: Record<TransportMode, string> = {
  WALK: '#9ca3af',
  SCOOTER: '#22c55e',
  CARPOOL: '#3b82f6',
}

export const MODE_ICONS: Record<TransportMode, string> = {
  WALK: '🚶',
  SCOOTER: '🛴',
  CARPOOL: '🚗',
}

export const DEFAULT_WEIGHTS: UserWeights = {
  w_time: 0.4,
  w_cost: 0.3,
  w_emissions: 0.2,
  w_comfort: 0.1,
}

export const INNOPOLIS_CENTER: [number, number] = [55.7523, 48.7445]
