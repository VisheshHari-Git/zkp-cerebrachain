import { ShieldCheck } from 'lucide-react'
import BrainScene from './BrainScene.jsx'

function CornerBracket({ position }) {
  const base = 'absolute h-6 w-6 border-signal/40'
  const map = {
    'top-left': 'top-3 left-3 border-t-2 border-l-2',
    'top-right': 'top-3 right-3 border-t-2 border-r-2',
    'bottom-left': 'bottom-3 left-3 border-b-2 border-l-2',
    'bottom-right': 'bottom-3 right-3 border-b-2 border-r-2',
  }
  return <span className={`${base} ${map[position]}`} aria-hidden="true" />
}

function CornerLabel({ position, children }) {
  const map = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  }
  return (
    <span
      className={`absolute ${map[position]} rounded-full border border-signal/30 bg-void/70 px-2.5 py-1 font-data text-[10px] tracking-wide text-signal/90 backdrop-blur-sm`}
    >
      {children}
    </span>
  )
}

export default function ScannerFrame({ scanning = false, scanProgress = 0, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl glass glow-signal grid-backdrop ${className}`}>
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-left" />
      <CornerBracket position="bottom-right" />

      <CornerLabel position="top-left">FLAIR</CornerLabel>
      <CornerLabel position="top-right">T1Gd</CornerLabel>
      <CornerLabel position="bottom-left">T2-weighted</CornerLabel>
      <CornerLabel position="bottom-right">
        <span className="flex items-center gap-1">
          <ShieldCheck size={11} className="text-signal" /> ZK Verified
        </span>
      </CornerLabel>

      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[38%] rounded-full border border-alert/40 bg-void/70 px-2.5 py-1 font-data text-[10px] tracking-wide text-alert/90 backdrop-blur-sm">
        Active Segmentation
      </span>

      <div className="h-full w-full">
        <BrainScene scanning={scanning} scanProgress={scanProgress} />
      </div>
    </div>
  )
}
