// Renders a single simulated MRI cross-section using an SVG noise filter
// clipped to a brain-like silhouette per anatomical plane. This is a
// procedural placeholder, not real imaging data.
const PLANE_PATHS = {
  Axial: 'M100,10 C160,10 190,55 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,55 40,10 100,10 Z',
  Coronal: 'M100,15 C150,15 175,50 178,90 C182,140 165,185 100,185 C35,185 18,140 22,90 C25,50 50,15 100,15 Z',
  Sagittal: 'M60,20 C120,10 175,40 182,90 C188,140 150,182 95,180 C55,178 25,150 20,110 C16,75 25,35 60,20 Z',
}

export default function MRISlice({ plane = 'Axial', seed = 1, showTumor = false, tumorProgress = 100 }) {
  const clipId = `slice-clip-${plane}`
  const filterId = `slice-noise-${plane}-${seed}`

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-black">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.02"
              numOctaves={4}
              seed={seed}
              result="noise"
            />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.85  0 0 0 0 0.85  0 0 0 0.9 0" />
          </filter>
          <clipPath id={clipId}>
            <path d={PLANE_PATHS[plane]} />
          </clipPath>
          <radialGradient id={`glow-${plane}`} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#0e2a2b" />
            <stop offset="100%" stopColor="#020404" />
          </radialGradient>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <rect width="200" height="200" fill={`url(#glow-${plane})`} />
          <rect width="200" height="200" filter={`url(#${filterId})`} opacity="0.55" />
          <path d={PLANE_PATHS[plane]} fill="none" stroke="#4ff3e0" strokeOpacity="0.25" strokeWidth="1" />

          {showTumor && (
            <ellipse
              cx="118"
              cy="95"
              rx={8 + (tumorProgress / 100) * 6}
              ry={7 + (tumorProgress / 100) * 5}
              fill="rgba(255,138,92,0.28)"
              stroke="#ff8a5c"
              strokeWidth="1.4"
              strokeDasharray={tumorProgress < 100 ? '3 2' : '0'}
            />
          )}
        </g>
      </svg>
      <span className="absolute bottom-2 left-2 font-data text-[10px] tracking-wide text-signal/70">
        {plane}
      </span>
    </div>
  )
}
