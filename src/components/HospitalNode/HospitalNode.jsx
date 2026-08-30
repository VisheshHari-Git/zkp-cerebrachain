import { motion } from 'framer-motion'
import { Building2, ArrowDown, ShieldCheck } from 'lucide-react'

export default function HospitalNode({ hospital, active, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`glass rounded-2xl p-4 flex flex-col gap-2 ${active ? 'glow-signal' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 size={15} className="text-signal" />
          <span className="font-display text-sm">{hospital.name}</span>
        </div>
        <span className="font-data text-[10px] text-mist-dim">{hospital.location}</span>
      </div>

      <div className="font-data text-[11px] text-mist flex flex-col gap-1 mt-1">
        <span>Private MRI Data</span>
        <ArrowDown size={11} className="text-mist-dim" />
        <span>Local 3D-UNet</span>
        <ArrowDown size={11} className="text-mist-dim" />
        <span>Model Update</span>
        <ArrowDown size={11} className="text-mist-dim" />
        <span className="flex items-center gap-1 text-signal">
          <ShieldCheck size={11} /> ZK Proof
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between font-data text-[10px] text-mist-dim">
        <span>{hospital.caseCount.toLocaleString()} local cases</span>
        <span className="text-signal">{hospital.updateId}</span>
      </div>
    </motion.div>
  )
}
