import './App.css'

import { CalculateRouteButton } from '@/features/routing/CalculateRouteButton'
import { RouteMetricsPanel } from '@/features/routing/RouteMetricsPanel'
import { RouteSegmentsList } from '@/features/routing/RouteSegmentsList'
import { WeightsPanel } from '@/features/routing/WeightsPanel'
import { ScenarioPanel } from '@/features/simulation/ScenarioPanel'
import { MapView } from '@/features/map/MapView'
import { useAppStore } from '@/shared/store/appStore'

function ErrorToast() {
  const { error, clearError } = useAppStore()
  if (!error) return null
  return (
    <div className="error-toast" role="alert">
      <span>{error}</span>
      <button className="error-toast__close" onClick={clearError} aria-label="Dismiss">
        ✕
      </button>
    </div>
  )
}

function App() {
  return (
    <div className="app-layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <header className="sidebar-header">
          <h1 className="sidebar-title">🚌 Innopolis Transit</h1>
          <p className="sidebar-subtitle">Multimodal Route Optimizer</p>
        </header>

        <div className="sidebar-body">
          <ScenarioPanel />
          <WeightsPanel />
          <CalculateRouteButton />
          <RouteMetricsPanel />
          <RouteSegmentsList />
        </div>

        <footer className="sidebar-footer">
          <p>Thesis · Innopolis University · 2025</p>
        </footer>
      </aside>

      {/* ── Map ── */}
      <main className="map-area">
        <MapView />
        <div className="map-legend">
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#9ca3af' }} />
            Walk
          </span>
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#22c55e' }} />
            Scooter
          </span>
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#3b82f6' }} />
            Carpool
          </span>
          <span className="legend-item">🛴 Scooter</span>
          <span className="legend-item">🔵 Driver</span>
        </div>
      </main>

      <ErrorToast />
    </div>
  )
}

export default App
