import 'leaflet/dist/leaflet.css'

import { MapContainer, TileLayer } from 'react-leaflet'

import { ClickToSetPoints } from './ClickToSetPoints'
import { RoutePolylineLayer } from './RoutePolylineLayer'
import { VehicleMarkersLayer } from './VehicleMarkersLayer'

import { INNOPOLIS_CENTER } from '@/shared/types/domain'

export function MapView() {
  return (
    <MapContainer
      center={INNOPOLIS_CENTER}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <VehicleMarkersLayer />
      <RoutePolylineLayer />
      <ClickToSetPoints />
    </MapContainer>
  )
}
