const tones = {
  signal: 'text-signal border-signal/30 bg-signal/10',
  verify: 'text-verify border-verify/30 bg-verify/10',
  alert: 'text-alert border-alert/30 bg-alert/10',
  mist: 'text-mist border-mist-dim/30 bg-white/5',
}

export default function StatusPill({ children, tone = 'signal', icon: Icon }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-data tracking-wide ${tones[tone]}`}
    >
      {Icon && <Icon size={12} strokeWidth={2.5} />}
      {children}
    </span>
  )
}
