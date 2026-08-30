import { motion } from 'framer-motion'
import { CheckCircle2, ScanSearch } from 'lucide-react'
import { segmentationStages } from '../../data/mriData.js'
import { useStagedSequence } from '../../hooks/useStagedSequence.js'
import GlassCard from '../shared/GlassCard.jsx'

export default function TumorSegmentation({ running, onComplete }) {
  const { index, done } = useStagedSequence(segmentationStages, {
    running,
    stepDuration: 950,
    onComplete,
  })

  const stage = segmentationStages[index]
  const progress = running ? stage.progress : 0

  return (
    <GlassCard className="p-6 flex flex-col gap-5" accent={done ? 'signal' : 'verify'}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {done ? (
            <CheckCircle2 size={18} className="text-signal" />
          ) : (
            <ScanSearch size={18} className="text-verify animate-pulse" />
          )}
          <h3 className="font-display text-lg">AI Tumor Segmentation</h3>
        </div>
        <span className="font-data text-xs text-mist-dim">3D-UNet v1.4</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between font-data text-xs text-mist">
          <span>{running ? stage.label : 'Idle'}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className={`h-full rounded-full ${done ? 'bg-signal' : 'bg-verify'}`}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>

      <p className="font-data text-xs text-mist-dim">
        {done ? 'Segmentation Complete ✓ — prototype output, not a clinical diagnosis.' : 'Simulated boundary tracing runs locally on-device.'}
      </p>
    </GlassCard>
  )
}
