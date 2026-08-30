import { Brain, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Brain size={16} className="text-signal" />
          <span className="font-display text-sm text-ink">
            ZKP <span className="text-signal">CerebraChain</span>
          </span>
        </div>
        <p className="font-data text-xs text-mist-dim text-center">
          Hackathon prototype — all AI, ZK-proof, and blockchain output shown is simulated for demonstration.
        </p>
        <a
          href="#"
          className="flex items-center gap-1.5 text-xs text-mist hover:text-signal transition-colors"
          aria-label="View source on GitHub"
        >
          <ExternalLink size={14} />
          Source
        </a>
      </div>
    </footer>
  )
}
