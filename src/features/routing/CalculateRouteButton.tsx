import { useRoute } from '@/shared/hooks/useRoute'
import { useAppStore } from '@/shared/store/appStore'

export function CalculateRouteButton() {
  const { origin, destination, isCalculating } = useAppStore()
  const { calculate } = useRoute()

  const canCalculate = !!origin && !!destination && !isCalculating

  return (
    <section className="panel panel--no-border">
      <button
        className={`calc-btn${isCalculating ? ' calc-btn--loading' : ''}`}
        onClick={() => void calculate()}
        disabled={!canCalculate}
        title={
          !origin
            ? 'Click the map to set origin first'
            : !destination
              ? 'Click the map to set destination'
              : 'Calculate optimal route'
        }
      >
        {isCalculating ? (
          <>
            <span className="spinner" /> Calculating…
          </>
        ) : (
          '🗺 Calculate Route'
        )}
      </button>

      {(!origin || !destination) && (
        <p className="calc-hint">
          {!origin
            ? '1️⃣ Click the map to set origin'
            : '2️⃣ Click the map to set destination'}
        </p>
      )}
    </section>
  )
}
