import { useState } from 'react'
import { UserRound, Activity, Layers, Gauge, Cpu } from 'lucide-react'
import { patient } from '../../data/mriData.js'
import { modelInfo } from '../../data/modelData.js'
import MRIControls from '../../components/MRIControls/MRIControls.jsx'
import MRIViewer from '../../components/MRIViewer/MRIViewer.jsx'
import GlassCard from '../../components/shared/GlassCard.jsx'
import StatusPill from '../../components/shared/StatusPill.jsx'

export default function Dashboard() {
  const [modality, setModality] = useState('T1')

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col gap-1 mb-8">
        <span className="font-data text-xs uppercase tracking-widest text-signal/70">Doctor Dashboard</span>
        <div className="flex items-center gap-3">
          <UserRound size={22} className="text-signal" />
          <h1 className="font-display text-3xl">Patient {patient.id}</h1>
        </div>
        <p className="font-data text-xs text-mist-dim">
          Age {patient.age} · Study date {patient.studyDate} · All data processed locally
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <GlassCard className="p-6 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-lg">MRI Modalities</h2>
            <MRIControls active={modality} onChange={setModality} />
          </div>
          <MRIViewer activeModality={modality} showTumor tumorProgress={100} />
        </GlassCard>

        <div className="flex flex-col gap-5">
          <GlassCard accent="verify" className="p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-verify" />
              <h3 className="font-display text-base">AI Analysis</h3>
            </div>

            <dl className="flex flex-col gap-3 font-data text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-mist">Tumor Status</dt>
                <dd><StatusPill tone="alert">Detected</StatusPill></dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-mist">Segmentation</dt>
                <dd><StatusPill tone="signal">Complete</StatusPill></dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-mist"><Gauge size={13} /> Dice Score</dt>
                <dd className="text-signal">{modelInfo.diceScore}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-mist"><Cpu size={13} /> Model</dt>
                <dd className="text-ink">{modelInfo.version}</dd>
              </div>
            </dl>
            <p className="font-data text-[10px] text-mist-dim border-t border-white/10 pt-3">
              Prototype/demo values — not a clinical diagnosis.
            </p>
          </GlassCard>

          <GlassCard className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-signal" />
              <h3 className="font-display text-base">Modalities Loaded</h3>
            </div>
            <ul className="flex flex-wrap gap-2 font-data text-xs text-mist">
              {['T1', 'T1Gd', 'T2', 'FLAIR'].map((m) => (
                <li key={m} className="rounded-full border border-white/10 px-3 py-1">{m}</li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
