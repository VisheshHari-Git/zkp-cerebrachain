import { motion } from 'framer-motion'
import { Network } from 'lucide-react'
import { hospitals } from '../../data/hospitals.js'
import HospitalNode from '../HospitalNode/HospitalNode.jsx'
import GlassCard from '../shared/GlassCard.jsx'

export default function FederatedNetwork({ active = false }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {hospitals.map((hospital, i) => (
          <HospitalNode key={hospital.id} hospital={hospital} active={active} delay={i * 0.08} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="font-data text-[10px] uppercase tracking-widest text-mist-dim">
          Encrypted / Verified Model Updates Only
        </div>
        <svg width="100%" height="60" viewBox="0 0 400 60" className="max-w-md" aria-hidden="true">
          {[40, 140, 240, 340].map((x) => (
            <motion.line
              key={x}
              x1={x}
              y1="0"
              x2="200"
              y2="55"
              stroke="#4ff3e0"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={active ? { pathLength: 1 } : { pathLength: 0.3 }}
              transition={{ duration: 1.2, delay: 0.1 }}
            />
          ))}
        </svg>

        <GlassCard accent="verify" className="flex items-center gap-2 px-6 py-3">
          <Network size={16} className="text-verify" />
          <span className="font-display text-sm">Federated Aggregator</span>
        </GlassCard>
      </div>
    </div>
  )
}
