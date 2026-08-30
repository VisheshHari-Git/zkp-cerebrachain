import { modalities } from '../../data/mriData.js'

export default function MRIControls({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="MRI modality">
      {modalities.map((mod) => {
        const isActive = mod === active
        return (
          <button
            key={mod}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(mod)}
            className={`rounded-full border px-4 py-1.5 font-data text-xs tracking-wide transition-colors ${
              isActive
                ? 'border-signal/50 bg-signal/15 text-signal'
                : 'border-white/10 text-mist hover:border-signal/30 hover:text-signal'
            }`}
          >
            {mod}
          </button>
        )
      })}
    </div>
  )
}
