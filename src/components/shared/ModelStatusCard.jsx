import { CheckCircle2, BrainCircuit } from 'lucide-react'
import { modelPipelineSteps, modelInfo } from '../../data/modelData.js'
import { useStagedSequence } from '../../hooks/useStagedSequence.js'
import GlassCard from './GlassCard.jsx'

export default function ModelStatusCard({ running, onComplete }) {
  const { index, done } = useStagedSequence(modelPipelineSteps, {
    running,
    stepDuration: 700,
    onComplete,
  })

  return (
    <GlassCard className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit size={18} className="text-signal" />
          <h3 className="font-display text-lg">{modelInfo.name}</h3>
        </div>
        <span className="font-data text-xs text-mist-dim">{modelInfo.version}</span>
      </div>

      <p className="font-data text-xs text-mist">
        {running && !done ? 'Analyzing MRI Volume...' : done ? 'AI Analysis Complete' : 'Idle'}
      </p>

      <ul className="flex flex-col gap-2">
        {modelPipelineSteps.map((step, i) => {
          const isDone = running && i <= index
          return (
            <li key={step.key} className="flex items-center gap-2 font-data text-xs">
              <CheckCircle2
                size={14}
                className={isDone ? 'text-signal' : 'text-mist-dim/40'}
                strokeWidth={2}
              />
              <span className={isDone ? 'text-ink' : 'text-mist-dim'}>{step.label}</span>
            </li>
          )
        })}
      </ul>

      {done && (
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
          <div>
            <p className="font-data text-[10px] text-mist-dim">Dice Score (demo)</p>
            <p className="font-display text-lg text-signal">{modelInfo.diceScore}</p>
          </div>
          <div>
            <p className="font-data text-[10px] text-mist-dim">Confidence (demo)</p>
            <p className="font-display text-lg text-signal">{modelInfo.confidence}</p>
          </div>
        </div>
      )}
    </GlassCard>
  )
}
