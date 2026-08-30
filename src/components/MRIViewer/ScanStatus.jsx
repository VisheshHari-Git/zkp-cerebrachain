import { motion, AnimatePresence } from 'framer-motion'
import { scanStages } from '../../data/mriData.js'
import { useStagedSequence } from '../../hooks/useStagedSequence.js'

export default function ScanStatus({ running, onComplete }) {
  const { index, done } = useStagedSequence(scanStages, {
    running,
    stepDuration: 800,
    onComplete,
  })

  const stage = scanStages[index]

  return (
    <div className="flex items-center gap-2 font-data text-sm">
      <span className={`h-2 w-2 rounded-full ${running ? 'bg-signal animate-pulse' : 'bg-mist-dim'}`} />
      <AnimatePresence mode="wait">
        <motion.span
          key={stage.key}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className={done ? 'text-signal' : 'text-mist'}
        >
          {running ? stage.label + (done ? ' ✓' : '') : 'Idle — awaiting scan'}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
