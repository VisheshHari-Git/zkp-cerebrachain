import { createContext, useContext, useState, useCallback } from 'react'

// The full simulated pipeline, in order. Every stage is a purely
// frontend UI state — nothing here calls a real model, prover, or chain.
export const PIPELINE_STAGES = [
  'IDLE',
  'SCANNING',
  'ANALYZING',
  'SEGMENTING',
  'ZK_VERIFYING',
  'FEDERATED_AGGREGATION',
  'BLOCKCHAIN_CONFIRMATION',
  'COMPLETE',
]

const DemoStateContext = createContext(null)

export function DemoStateProvider({ children }) {
  const [stage, setStage] = useState('IDLE')

  const stageIndex = PIPELINE_STAGES.indexOf(stage)

  const goToStage = useCallback((next) => {
    if (PIPELINE_STAGES.includes(next)) setStage(next)
  }, [])

  const advance = useCallback(() => {
    setStage((current) => {
      const idx = PIPELINE_STAGES.indexOf(current)
      const next = PIPELINE_STAGES[Math.min(idx + 1, PIPELINE_STAGES.length - 1)]
      return next
    })
  }, [])

  const reset = useCallback(() => setStage('IDLE'), [])

  const value = { stage, stageIndex, stages: PIPELINE_STAGES, goToStage, advance, reset }

  return <DemoStateContext.Provider value={value}>{children}</DemoStateContext.Provider>
}

export function useDemoState() {
  const ctx = useContext(DemoStateContext)
  if (!ctx) throw new Error('useDemoState must be used within a DemoStateProvider')
  return ctx
}
