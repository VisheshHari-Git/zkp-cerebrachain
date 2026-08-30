import { Database, CheckCircle2 } from 'lucide-react'
import { chainRecord } from '../../data/modelData.js'
import GlassCard from '../shared/GlassCard.jsx'

export default function IPFSStatus({ active }) {
  return (
    <GlassCard className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Database size={16} className="text-signal" />
        <h4 className="font-display text-sm">IPFS Storage</h4>
        {active && <CheckCircle2 size={14} className="text-signal ml-auto" />}
      </div>
      <dl className="font-data text-xs text-mist flex flex-col gap-1.5">
        <div className="flex justify-between gap-3">
          <dt className="text-mist-dim">Model Version</dt>
          <dd className="text-ink">{chainRecord.modelVersion}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-mist-dim">IPFS CID</dt>
          <dd className="text-signal truncate max-w-[160px]">{chainRecord.ipfsCid}</dd>
        </div>
      </dl>
      <p className="font-data text-[10px] text-mist-dim">Simulated content-addressed storage — prototype value.</p>
    </GlassCard>
  )
}
