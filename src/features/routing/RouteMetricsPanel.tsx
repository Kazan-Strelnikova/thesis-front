import { useAppStore } from '@/shared/store/appStore'

export function RouteMetricsPanel() {
  const routeResult = useAppStore((s) => s.routeResult)

  if (!routeResult) return null

  const { metrics, status } = routeResult

  if (status === 'INFEASIBLE') {
    return (
      <section className="panel panel--warning">
        <h3 className="panel-title">⚠️ No Feasible Route</h3>
        <p className="panel-hint">
          No route satisfies the current constraints. Try changing the scenario or relaxing
          weights.
        </p>
      </section>
    )
  }

  if (status === 'ERROR') {
    return (
      <section className="panel panel--error">
        <h3 className="panel-title">❌ Solver Error</h3>
        <p className="panel-hint">The optimization solver encountered an error.</p>
      </section>
    )
  }

  // Satisfaction score: color-code 1-10
  const satColor =
    metrics.satisfaction_score >= 7
      ? '#22c55e'
      : metrics.satisfaction_score >= 4
        ? '#f59e0b'
        : '#ef4444'

  return (
    <section className="panel panel--success">
      <h3 className="panel-title">✅ Route Metrics</h3>
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-icon">⏱</span>
          <span className="metric-value">{metrics.total_time_min.toFixed(1)}</span>
          <span className="metric-unit">min</span>
        </div>
        <div className="metric-card">
          <span className="metric-icon">💰</span>
          <span className="metric-value">{metrics.total_price_rub.toFixed(0)}</span>
          <span className="metric-unit">RUB</span>
        </div>
        <div className="metric-card">
          <span className="metric-icon">🌿</span>
          <span className="metric-value">{metrics.total_emissions_g.toFixed(0)}</span>
          <span className="metric-unit">g CO₂</span>
        </div>
        <div className="metric-card">
          <span className="metric-icon">⭐</span>
          <span className="metric-value" style={{ color: satColor }}>
            {metrics.satisfaction_score.toFixed(1)}
          </span>
          <span className="metric-unit">/10</span>
        </div>
      </div>
      <p className="solve-time">Solved in {metrics.solve_time_s.toFixed(3)}s</p>
    </section>
  )
}
