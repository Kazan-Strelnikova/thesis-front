import { divIcon } from 'leaflet'
import { Marker, Tooltip, useMapEvents } from 'react-leaflet'

import { useAppStore } from '@/shared/store/appStore'

const originIcon = divIcon({
  html: `<div style="
    width:16px;height:16px;border-radius:50%;
    background:#ef4444;border:3px solid #fff;
    box-shadow:0 0 4px rgba(0,0,0,0.5)
  "></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

const destinationIcon = divIcon({
  html: `<div style="
    width:16px;height:16px;border-radius:50%;
    background:#3b82f6;border:3px solid #fff;
    box-shadow:0 0 4px rgba(0,0,0,0.5)
  "></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

export function ClickToSetPoints() {
  const { origin, destination, setOrigin, setDestination, resetPoints } = useAppStore()

  useMapEvents({
    click(e) {
      const point = { lat: e.latlng.lat, lon: e.latlng.lng }

      if (!origin) {
        setOrigin(point)
      } else if (!destination) {
        setDestination(point)
      } else {
        // Third click: reset and start over
        resetPoints()
        setOrigin(point)
      }
    },
  })

  return (
    <>
      {origin && (
        <Marker position={[origin.lat, origin.lon]} icon={originIcon}>
          <Tooltip permanent direction="top" offset={[0, -10]}>
            🔴 Origin
          </Tooltip>
        </Marker>
      )}
      {destination && (
        <Marker position={[destination.lat, destination.lon]} icon={destinationIcon}>
          <Tooltip permanent direction="top" offset={[0, -10]}>
            🔵 Destination
          </Tooltip>
        </Marker>
      )}
    </>
  )
}
