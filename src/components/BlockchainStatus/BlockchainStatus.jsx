import { Link2, CheckCircle2 } from 'lucide-react'
import { chainRecord } from '../../data/modelData.js'
import GlassCard from '../shared/GlassCard.jsx'

export default function BlockchainStatus({ active }) {
  return (
    <GlassCard accent="verify" className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Link2 size={16} className="text-verify" />
        <h4 className="font-display text-sm">Blockchain Record</h4>
        {active && <CheckCircle2 size={14} className="text-verify ml-auto" />}
      </div>
      <dl className="font-data text-xs text-mist flex flex-col gap-1.5">
        <div className="flex justify-between gap-3">
          <dt className="text-mist-dim">Transaction Hash</dt>
          <dd className="text-verify truncate max-w-[160px]">{chainRecord.txHash}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-mist-dim">Network</dt>
          <dd className="text-ink text-right">{chainRecord.network}</dd>
        </div>
      </dl>
      <p className="font-data text-[10px] text-mist-dim">
        {active ? 'Blockchain Record Verified ✓ (simulated).' : 'Awaiting confirmation…'}
      </p>
    </GlassCard>
  )
}
