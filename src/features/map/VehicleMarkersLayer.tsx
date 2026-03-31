import { divIcon } from 'leaflet'
import { CircleMarker, Marker, Tooltip } from 'react-leaflet'

import { useSupply } from '@/shared/hooks/useSupply'

// Custom DivIcon for scooters and carpool drivers
function makeIcon(emoji: string) {
  return divIcon({
    html: `<span style="font-size:20px;line-height:1">${emoji}</span>`,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

const scooterIcon = makeIcon('🛴')
// const carpoolIcon = makeIcon('🚗')

export function VehicleMarkersLayer() {
  const { vehicles } = useSupply()

  return (
    <>
      {vehicles.map((vehicle) => {
        const pos: [number, number] = [vehicle.lat, vehicle.lon]

        if (vehicle.type === 'SCOOTER') {
          return (
            <Marker key={vehicle.id} position={pos} icon={scooterIcon}>
              <Tooltip>
                <strong>Scooter</strong> {vehicle.id}
                <br />
                🔋 {vehicle.battery_level ?? '?'}%
                <br />
                Status: {vehicle.status ?? 'AVAILABLE'}
              </Tooltip>
            </Marker>
          )
        }

        // CARPOOL_DRIVER
        const color = vehicle.status === 'IN_USE' ? '#f59e0b' : '#3b82f6'
        return (
          <CircleMarker
            key={vehicle.id}
            center={pos}
            radius={8}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.8, weight: 2 }}
          >
            <Tooltip>
              <strong>Carpool Driver</strong> {vehicle.id}
              <br />
              Status: {vehicle.status ?? 'AVAILABLE'}
            </Tooltip>
          </CircleMarker>
        )
      })}
    </>
  )
}
