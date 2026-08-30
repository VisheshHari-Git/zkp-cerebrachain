import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero-medical relative overflow-hidden">

      {/* BACKGROUND VIDEO */}
      <video
        src="/brain-background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-150"
      />

      {/* DARK OVERLAY */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-void/75"
        aria-hidden="true"
      />

      {/* Existing decorative glow */}
      <div className="hero-medical-glow" aria-hidden="true" />

      {/* Neural network decoration */}
      <svg
        className="hero-neural-network pointer-events-none absolute inset-0 z-[2] h-full w-full"
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g className="hero-neural-lines">
          <path d="M0 180C150 92 260 294 430 196S710 38 872 160s288 38 568-62" />
          <path d="M0 495c146-123 278-28 424-119s243-280 419-155 313 72 597-40" />
          <path d="M96 760c80-189 227-105 349-245S681 293 816 394s268 33 506-182" />
          <path d="M122 122l128 94 122-74 148 112M1008 278l119-100 132 96 128-130" />
        </g>

        <g className="hero-neural-nodes">
          <circle cx="250" cy="216" r="4" />
          <circle cx="430" cy="196" r="4" />
          <circle cx="698" cy="70" r="3" />
          <circle cx="872" cy="160" r="5" />
          <circle cx="1127" cy="178" r="4" />
          <circle cx="424" cy="376" r="4" />
          <circle cx="843" cy="221" r="4" />
          <circle cx="816" cy="394" r="5" />
          <circle cx="1259" cy="274" r="3" />
        </g>

        <g className="hero-mri-contours">
          <ellipse cx="1192" cy="462" rx="184" ry="218" />
          <ellipse cx="1192" cy="462" rx="146" ry="176" />
          <ellipse cx="1192" cy="462" rx="104" ry="128" />
          <path d="M1120 455c25-75 107-113 162-64 44 39 23 128-47 151-62 20-130-25-115-87Z" />
        </g>
      </svg>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10 lg:py-24 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] xl:gap-14 xl:py-28">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-3 py-1 font-data text-xs text-signal">
            <ShieldCheck size={15} />
            Federated · Zero-Knowledge · Multi-Modal
          </span>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[2.5rem] xl:text-[2.9rem]">
            <span className="block">
              Federated Zero-Knowledge Multi-Modal
            </span>

            <span className="block">
              Neuroimaging (MRI) Diagnostic Network
            </span>

            <span className="mt-3 block text-gradient-signal">
              Without Sharing Patient Data.
            </span>
          </h1>

          <p className="max-w-lg text-lg text-mist">
            Privacy-preserving collaborative intelligence for next-generation medical imaging.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-medium text-void transition-transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(79,243,224,0.35)]"
            >
              Start MRI Analysis
              <ArrowRight size={16} />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-ink transition-colors hover:border-verify/50 hover:text-verify"
            >
              Explore Architecture
            </a>
          </div>

          <div className="flex gap-8 pt-6 font-data text-xs text-mist-dim">
            <div>
              <p className="text-xl font-semibold text-ink">4</p>
              <p>Hospital Nodes</p>
            </div>

            <div>
              <p className="text-xl font-semibold text-ink">0</p>
              <p>Raw Scans Shared</p>
            </div>

            <div>
              <p className="text-xl font-semibold text-ink">100%</p>
              <p>Local Training</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT BRAIN VIDEO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto aspect-square h-auto w-full max-w-[720px] lg:mr-0 lg:aspect-auto lg:h-[620px] xl:h-[640px]"
        >
          <div className="absolute -inset-1 rounded-[2rem] glass glow-signal" />

          <div
            className="absolute -inset-8 -z-10 rounded-full bg-signal/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] border border-signal/15 bg-panel">
            <video
              src="/brain-animation.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-center"
            />

            <div
              className="pointer-events-none absolute inset-0 rounded-[1.85rem] ring-1 ring-inset ring-white/5"
              aria-hidden="true"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
