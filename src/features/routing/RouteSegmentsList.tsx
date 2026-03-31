import { useAppStore } from '@/shared/store/appStore'
import { MODE_COLORS, MODE_ICONS } from '@/shared/types/domain'

export function RouteSegmentsList() {
  const routeResult = useAppStore((s) => s.routeResult)

  if (!routeResult || routeResult.segments.length === 0) return null

  return (
    <section className="panel">
      <h3 className="panel-title">🗺 Route Steps</h3>
      <ol className="segments-list">
        {routeResult.segments.map((seg, idx) => (
          <li key={idx} className="segment-item">
            <span
              className="segment-mode-dot"
              style={{ background: MODE_COLORS[seg.mode] }}
            />
            <div className="segment-body">
              <span className="segment-instruction">
                {MODE_ICONS[seg.mode]} {seg.instruction}
              </span>
              <span className="segment-meta">
                {seg.distance_km.toFixed(2)} km · {seg.duration_min.toFixed(1)} min
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
