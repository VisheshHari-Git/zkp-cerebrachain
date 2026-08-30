// Reusable glassmorphism card used across dashboard, ZK, and network sections.
export default function GlassCard({ children, className = '', accent = 'signal', ...props }) {
  const accentClass = accent === 'verify' ? 'glass glass-violet glow-verify' : 'glass glow-signal'
  return (
    <div className={`${accentClass} rounded-2xl ${className}`} {...props}>
      {children}
    </div>
  )
}
