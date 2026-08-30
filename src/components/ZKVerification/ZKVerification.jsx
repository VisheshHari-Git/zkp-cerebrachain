import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Loader2, Lock } from 'lucide-react'
import { zkSteps, zkResult } from '../../data/modelData.js'
import { useStagedSequence } from '../../hooks/useStagedSequence.js'
import GlassCard from '../shared/GlassCard.jsx'
import StatusPill from '../shared/StatusPill.jsx'

export default function ZKVerification({ onVerified }) {
  const [running, setRunning] = useState(false)
  const { index, done } = useStagedSequence(zkSteps, {
    running,
    stepDuration: 750,
    onComplete: onVerified,
  })

  return (
    <GlassCard accent="verify" className="p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-verify" />
          <h3 className="font-display text-lg">Zero-Knowledge Verification</h3>
        </div>
        {!running && !done && (
          <button
            onClick={() => setRunning(true)}
            className="rounded-full border border-verify/40 bg-verify/10 px-4 py-1.5 font-data text-xs text-verify transition-colors hover:bg-verify/20"
          >
            Verify AI Update
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {running && !done && (
          <motion.div
            key="steps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 font-data text-sm text-mist"
          >
            <Loader2 size={16} className="animate-spin text-verify" />
            {zkSteps[index]}
          </motion.div>
        )}

        {done && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-signal">
              <ShieldCheck size={20} />
              <span className="font-display text-base">ZK-SNARK VERIFIED</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatusPill tone="signal">DICOM: {zkResult.dicomIntegrity}</StatusPill>
              <StatusPill tone="signal">Training: {zkResult.trainingIntegrity}</StatusPill>
              <StatusPill tone="signal">Gradient: {zkResult.gradientIntegrity}</StatusPill>
              <StatusPill tone="verify">Proof: {zkResult.proofStatus}</StatusPill>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-data text-xs text-mist">
              Proof ID: <span className="text-signal">{zkResult.proofId}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!running && !done && (
        <p className="font-data text-xs text-mist-dim">
          Generates a simulated zk-SNARK proof attesting to training integrity — no raw data is revealed.
        </p>
      )}
    </GlassCard>
  )
}
