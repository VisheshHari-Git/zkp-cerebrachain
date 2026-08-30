import { motion } from 'framer-motion'
import { HardDrive, Cpu, ShieldCheck, Share2 } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import GlassCard from './GlassCard.jsx'

const STEPS = [
  {
    icon: HardDrive,
    title: 'Data stays local',
    body: 'Each hospital keeps its raw MRI scans on its own infrastructure — never uploaded anywhere.',
  },
  {
    icon: Cpu,
    title: 'Local model training',
    body: 'A 3D-UNet trains on-site against the hospital\u2019s own cases, producing only a model update.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-knowledge proof',
    body: 'A zk-SNARK proof attests the update was trained correctly, without revealing any patient data.',
  },
  {
    icon: Share2,
    title: 'Federated aggregation',
    body: 'Verified updates are combined via FedAvg into a single global model, recorded on-chain.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Architecture"
        title="How the network protects patient data"
        description="Four stages turn isolated hospital datasets into one continuously improving diagnostic model — with no raw imaging ever leaving its source."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <GlassCard className="p-6 h-full flex flex-col gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-signal/30 bg-signal/10">
                <step.icon size={18} className="text-signal" />
              </span>
              <h3 className="font-display text-base">{step.title}</h3>
              <p className="text-sm text-mist leading-relaxed">{step.body}</p>
              <span className="mt-auto font-data text-[10px] text-mist-dim">Step {i + 1} of 4</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
