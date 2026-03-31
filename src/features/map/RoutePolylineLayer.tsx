import { Polyline, Tooltip } from 'react-leaflet'

import { useAppStore } from '@/shared/store/appStore'
import { MODE_COLORS, MODE_ICONS } from '@/shared/types/domain'
import type { TransportMode } from '@/shared/types/domain'

const MODE_DASH: Record<TransportMode, string | undefined> = {
  WALK: '6 6',
  SCOOTER: undefined,
  CARPOOL: undefined,
}

export function RoutePolylineLayer() {
  const routeResult = useAppStore((s) => s.routeResult)

  if (!routeResult) return null

  return (
    <>
      {routeResult.segments.map((segment, idx) => {
        const positions: [number, number][] = segment.geometry.map(([lat, lon]) => [lat, lon])
        const color = MODE_COLORS[segment.mode]
        const dashArray = MODE_DASH[segment.mode]

        return (
          <Polyline
            key={idx}
            positions={positions}
            pathOptions={{
              color,
              weight: 5,
              opacity: 0.85,
              dashArray,
            }}
          >
            <Tooltip sticky>
              {MODE_ICONS[segment.mode]} <strong>{segment.mode}</strong>
              <br />
              {segment.instruction}
              <br />
              {segment.distance_km.toFixed(2)} km · {segment.duration_min.toFixed(1)} min
            </Tooltip>
          </Polyline>
        )
      })}
    </>
  )
}
