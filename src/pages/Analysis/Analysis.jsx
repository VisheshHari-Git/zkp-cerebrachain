import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PlayCircle, RotateCcw, CheckCircle2 } from 'lucide-react'
import { useDemoState, PIPELINE_STAGES } from '../../context/DemoStateContext.jsx'
import SectionHeading from '../../components/shared/SectionHeading.jsx'
import GlassCard from '../../components/shared/GlassCard.jsx'
import BrainScene from '../../components/BrainSimulation/BrainScene.jsx'
import ScanStatus from '../../components/MRIViewer/ScanStatus.jsx'
import ModelStatusCard from '../../components/shared/ModelStatusCard.jsx'
import TumorSegmentation from '../../components/TumorSegmentation/TumorSegmentation.jsx'
import ZKVerification from '../../components/ZKVerification/ZKVerification.jsx'
import FederatedNetwork from '../../components/FederatedNetwork/FederatedNetwork.jsx'
import FedAvgVisualization from '../../components/FedAvgVisualization/FedAvgVisualization.jsx'
import IPFSStatus from '../../components/IPFSStatus/IPFSStatus.jsx'
import BlockchainStatus from '../../components/BlockchainStatus/BlockchainStatus.jsx'

const STAGE_LABELS = {
  IDLE: 'Idle',
  SCANNING: 'MRI Scan',
  ANALYZING: 'AI Inference',
  SEGMENTING: 'Segmentation',
  ZK_VERIFYING: 'ZK Verification',
  FEDERATED_AGGREGATION: 'Federated Aggregation',
  BLOCKCHAIN_CONFIRMATION: 'Blockchain Record',
  COMPLETE: 'Complete',
}

export default function Analysis() {
  const { stage, stageIndex, advance, reset } = useDemoState()
  const [chainConfirmed, setChainConfirmed] = useState(false)

  // Once we reach BLOCKCHAIN_CONFIRMATION, run a short confirmation timer
  // then move to COMPLETE — mirrors the tx-wait feel without a real chain call.
  useEffect(() => {
    if (stage === 'BLOCKCHAIN_CONFIRMATION') {
      setChainConfirmed(false)
      const t = setTimeout(() => {
        setChainConfirmed(true)
        setTimeout(advance, 700)
      }, 1400)
      return () => clearTimeout(t)
    }
  }, [stage, advance])

  const started = stage !== 'IDLE'
  const finished = stage === 'COMPLETE'

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col gap-16">
      <div className="flex flex-col items-center gap-6 text-center">
        <SectionHeading
          eyebrow="Full Verification Flow"
          title="From MRI scan to on-chain verified model update"
          description="Runs the entire simulated pipeline in order — scanning, inference, segmentation, zero-knowledge verification, federated aggregation, and blockchain confirmation."
        />

        <div className="flex flex-wrap items-center justify-center gap-3">
          {!started && (
            <button
              onClick={advance}
              className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-medium text-void transition-transform hover:scale-[1.03]"
            >
              <PlayCircle size={18} /> Start Full Pipeline
            </button>
          )}
          {finished && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-ink hover:border-signal/40"
            >
              <RotateCcw size={16} /> Run Again
            </button>
          )}
        </div>

        {/* Stage progress rail */}
        <div className="flex w-full max-w-3xl items-center justify-between gap-1 pt-4">
          {PIPELINE_STAGES.filter((s) => s !== 'IDLE').map((s, i) => {
            const idx = PIPELINE_STAGES.indexOf(s)
            const isDone = stageIndex > idx
            const isCurrent = stage === s
            return (
              <div key={s} className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  className={`h-1.5 w-full rounded-full transition-colors ${
                    isDone || isCurrent ? 'bg-signal' : 'bg-white/10'
                  }`}
                />
                <span
                  className={`font-data text-[9px] text-center leading-tight ${
                    isCurrent ? 'text-signal' : isDone ? 'text-mist' : 'text-mist-dim'
                  }`}
                >
                  {STAGE_LABELS[s]}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scan + Inference */}
      {started && (
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GlassCard className="p-4 h-[340px] flex flex-col gap-3">
            <BrainScene scanning={stage === 'SCANNING'} />
            <ScanStatus
              running={stage === 'SCANNING'}
              onComplete={() => setTimeout(advance, 400)}
            />
          </GlassCard>
          <ModelStatusCard
            running={stage === 'ANALYZING' || stageIndex > PIPELINE_STAGES.indexOf('ANALYZING')}
            onComplete={() => stage === 'ANALYZING' && setTimeout(advance, 400)}
          />
        </section>
      )}

      {/* Segmentation */}
      {stageIndex >= PIPELINE_STAGES.indexOf('SEGMENTING') && (
        <section>
          <TumorSegmentation
            running={stageIndex >= PIPELINE_STAGES.indexOf('SEGMENTING')}
            onComplete={() => stage === 'SEGMENTING' && setTimeout(advance, 500)}
          />
        </section>
      )}

      {/* ZK Verification */}
      {stageIndex >= PIPELINE_STAGES.indexOf('ZK_VERIFYING') && (
        <section>
          <ZKVerification onVerified={() => stage === 'ZK_VERIFYING' && setTimeout(advance, 600)} />
        </section>
      )}

      {/* Federated Network + FedAvg */}
      {stageIndex >= PIPELINE_STAGES.indexOf('FEDERATED_AGGREGATION') && (
        <section className="flex flex-col gap-8">
          <FederatedNetwork active />
          <FedAvgVisualization
            running={stageIndex >= PIPELINE_STAGES.indexOf('FEDERATED_AGGREGATION')}
            onComplete={() => stage === 'FEDERATED_AGGREGATION' && setTimeout(advance, 600)}
          />
        </section>
      )}

      {/* IPFS + Blockchain */}
      {stageIndex >= PIPELINE_STAGES.indexOf('BLOCKCHAIN_CONFIRMATION') && (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <IPFSStatus active={chainConfirmed} />
          <BlockchainStatus active={chainConfirmed} />
        </section>
      )}

      {finished && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 rounded-2xl border border-signal/30 bg-signal/10 py-10 text-center"
        >
          <CheckCircle2 size={28} className="text-signal" />
          <h3 className="font-display text-xl">Pipeline Complete</h3>
          <p className="max-w-md text-sm text-mist">
            Global model v1.4 verified and recorded — every step ran on simulated, prototype data.
          </p>
        </motion.div>
      )}
    </div>
  )
}
