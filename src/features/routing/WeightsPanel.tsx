import { useAppStore } from '@/shared/store/appStore'
import type { UserWeights } from '@/shared/types/domain'

type WeightKey = keyof UserWeights

const WEIGHT_CONFIG: { key: WeightKey; label: string; icon: string }[] = [
  { key: 'w_time', label: 'Time', icon: '⏱' },
  { key: 'w_cost', label: 'Cost', icon: '💰' },
  { key: 'w_emissions', label: 'Emissions', icon: '🌿' },
  { key: 'w_comfort', label: 'Comfort', icon: '😌' },
]

/**
 * Normalizes weights so they sum to 1.0.
 * When one slider changes, the others are scaled proportionally.
 */
function normalizeWeights(weights: UserWeights, changedKey: WeightKey, newValue: number): UserWeights {
  const updated = { ...weights, [changedKey]: newValue }
  const total = Object.values(updated).reduce((a, b) => a + b, 0)
  if (total === 0) {
    return { w_time: 0.25, w_cost: 0.25, w_emissions: 0.25, w_comfort: 0.25 }
  }
  return {
    w_time: updated.w_time / total,
    w_cost: updated.w_cost / total,
    w_emissions: updated.w_emissions / total,
    w_comfort: updated.w_comfort / total,
  }
}

export function WeightsPanel() {
  const { weights, setWeights } = useAppStore()

  function handleChange(key: WeightKey, rawValue: number) {
    const normalized = normalizeWeights(weights, key, rawValue)
    setWeights(normalized)
  }

  return (
    <section className="panel">
      <h3 className="panel-title">⚖️ Objective Weights (λ)</h3>
      <p className="panel-hint">Sliders auto-normalize to sum = 1.0</p>
      <div className="weights-list">
        {WEIGHT_CONFIG.map(({ key, label, icon }) => (
          <div key={key} className="weight-row">
            <label className="weight-label">
              {icon} {label}
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={weights[key]}
              onChange={(e) => handleChange(key, parseFloat(e.target.value))}
              className="weight-slider"
            />
            <span className="weight-value">{weights[key].toFixed(2)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
