import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Cpu } from 'lucide-react'
import { hospitals } from '../../data/hospitals.js'
import { fedAvgResult } from '../../data/modelData.js'
import GlassCard from '../shared/GlassCard.jsx'

export default function FedAvgVisualization({ running, onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!running) {
      setProgress(0)
      return undefined
    }
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 8, 100)
        if (next === 100) {
          clearInterval(interval)
          onComplete?.()
        }
        return next
      })
    }, 90)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  return (
    <GlassCard className="p-6 flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Cpu size={18} className="text-signal" />
        <h3 className="font-display text-lg">FedAvg Aggregation</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {hospitals.map((h) => (
          <div key={h.id} className="rounded-lg border border-white/10 px-3 py-2 font-data text-[11px] text-mist">
            {h.name} → {h.updateId}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between font-data text-xs text-mist">
          <span>Aggregating weighted updates…</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-signal"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center rounded-xl border border-signal/30 bg-signal/10 py-3 font-display text-signal"
        >
          {fedAvgResult.globalModelVersion}
        </motion.div>
      )}
    </GlassCard>
  )
}
