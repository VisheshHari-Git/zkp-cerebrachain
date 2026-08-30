import { motion } from 'framer-motion'
import { Hospital, Lock, Cpu, ShieldCheck, Network, ArrowDown } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const FLOW = [
  { icon: Hospital, label: 'Hospital' },
  { icon: Lock, label: 'Private MRI Data' },
  { icon: Cpu, label: 'Local AI Training' },
  { icon: ShieldCheck, label: 'Verified Model Update' },
  { icon: Network, label: 'Federated Network' },
]

export default function SecuritySection() {
  return (
    <section id="security" className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="glass glow-verify rounded-3xl px-6 py-16 md:px-16">
        <SectionHeading
          eyebrow="Data Governance"
          title="Your MRI Data Never Leaves the Hospital."
          description="Raw scans remain on local infrastructure at every step. Only cryptographically verified model updates ever travel across the network."
        />

        <div className="mt-14 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-2">
          {FLOW.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 md:flex-row"
            >
              <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-5 py-4">
                <item.icon size={18} className="text-verify" />
                <span className="font-data text-xs text-mist whitespace-nowrap">{item.label}</span>
              </div>
              {i < FLOW.length - 1 && (
                <ArrowDown size={16} className="text-mist-dim md:-rotate-90" />
              )}
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center font-data text-sm text-signal">
          Raw MRI scans remain local.
        </p>
      </div>
    </section>
  )
}
