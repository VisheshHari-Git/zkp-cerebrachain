import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PlayCircle, ArrowRight, Network } from 'lucide-react'
import Hero from '../../components/Hero/Hero.jsx'
import HowItWorks from '../../components/shared/HowItWorks.jsx'
import SecuritySection from '../../components/shared/SecuritySection.jsx'
import SectionHeading from '../../components/shared/SectionHeading.jsx'
import GlassCard from '../../components/shared/GlassCard.jsx'
import BrainScene from '../../components/BrainSimulation/BrainScene.jsx'
import ScanStatus from '../../components/MRIViewer/ScanStatus.jsx'
import ModelStatusCard from '../../components/shared/ModelStatusCard.jsx'
import TumorSegmentation from '../../components/TumorSegmentation/TumorSegmentation.jsx'
import FederatedNetwork from '../../components/FederatedNetwork/FederatedNetwork.jsx'

export default function Home() {
  const [demoRunning, setDemoRunning] = useState(false)
  const [scanDone, setScanDone] = useState(false)

  function runDemo() {
    setScanDone(false)
    setDemoRunning(true)
  }

  return (
    <>
      <Hero />
      <HowItWorks />

      {/* AI Analysis preview */}
      <section id="ai-analysis" className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="AI Analysis"
          title="Watch a simulated scan run end-to-end"
          description="This preview drives the same pipeline used on the full Analysis page — MRI scan, 3D-UNet inference, and tumor segmentation, entirely client-side."
        />

        <div className="mt-10 flex justify-center">
          <button
            onClick={runDemo}
            className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-medium text-void transition-transform hover:scale-[1.03]"
          >
            <PlayCircle size={18} /> Run Simulated Scan
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GlassCard className="p-4 h-[360px] flex flex-col gap-3">
            <BrainScene scanning={demoRunning && !scanDone} />
            <ScanStatus running={demoRunning} onComplete={() => setScanDone(true)} />
          </GlassCard>

          <div className="flex flex-col gap-6">
            <ModelStatusCard running={scanDone} />
            <TumorSegmentation running={scanDone} />
          </div>
        </div>
      </section>

      {/* Network preview */}
      <section id="network" className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Federated Network"
          title="Four hospitals, one continuously improving model"
          description="Local updates, never raw data, flow into a shared aggregator secured by zero-knowledge proofs."
        />
        <div className="mt-12">
          <FederatedNetwork />
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 rounded-full border border-verify/40 bg-verify/10 px-6 py-3 font-medium text-verify transition-colors hover:bg-verify/20"
          >
            <Network size={16} /> Open Full Verification Flow <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <SecuritySection />

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl px-6 pb-24 text-center"
      >
        <p className="font-data text-xs text-mist-dim">
          Prototype notice: all AI diagnoses, ZK proofs, and blockchain records shown throughout this
          demo are simulated for hackathon presentation purposes only.
        </p>
      </motion.section>
    </>
  )
}
