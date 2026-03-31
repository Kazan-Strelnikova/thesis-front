import { useScenario } from '@/shared/hooks/useScenario'
import { useAppStore } from '@/shared/store/appStore'
import type { ScenarioType } from '@/shared/types/domain'
import { SCENARIO_ICONS, SCENARIO_LABELS } from '@/shared/types/domain'

const ALL_SCENARIOS: ScenarioType[] = [
  'NORMAL',
  'MORNING_PEAK',
  'EVENING_OFFPEAK',
  'RAINY_WEATHER',
  'CITY_EVENT',
  'MAJOR_ACCIDENT',
]

export function ScenarioPanel() {
  const { scenario, scenarioPhysics, isScenarioLoading } = useAppStore()
  const { applyScenario } = useScenario()

  return (
    <section className="panel">
      <h3 className="panel-title">🌍 Urban Scenario</h3>
      <div className="scenario-grid">
        {ALL_SCENARIOS.map((s) => (
          <button
            key={s}
            className={`scenario-btn${scenario === s ? ' scenario-btn--active' : ''}`}
            onClick={() => void applyScenario(s)}
            disabled={isScenarioLoading}
            title={SCENARIO_LABELS[s]}
          >
            <span className="scenario-icon">{SCENARIO_ICONS[s]}</span>
            <span className="scenario-label">{SCENARIO_LABELS[s]}</span>
          </button>
        ))}
      </div>

      {scenarioPhysics && (
        <div className="scenario-physics">
          <div className="physics-row">
            <span>Speed</span>
            <span className="physics-val">
              ×{scenarioPhysics.speed_multiplier.toFixed(2)}
            </span>
          </div>
          <div className="physics-row">
            <span>Demand</span>
            <span className="physics-val">
              ×{scenarioPhysics.demand_multiplier.toFixed(2)}
            </span>
          </div>
          <div className="physics-row">
            <span>Emissions</span>
            <span className="physics-val">
              ×{scenarioPhysics.emission_multiplier.toFixed(2)}
            </span>
          </div>
          <div className="physics-row">
            <span>Capacity</span>
            <span className="physics-val">
              ×{scenarioPhysics.capacity_multiplier.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
