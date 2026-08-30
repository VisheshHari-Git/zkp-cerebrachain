import { viewPlanes } from '../../data/mriData.js'
import MRISlice from './MRISlice.jsx'

export default function MRIViewer({ activeModality = 'T1', showTumor = false, tumorProgress = 100 }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-ink">MRI Viewer</h3>
        <span className="font-data text-xs text-mist-dim">Modality: {activeModality} · Simulated</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {viewPlanes.map((plane, i) => (
          <MRISlice
            key={plane}
            plane={plane}
            seed={i + (activeModality.length || 1)}
            showTumor={showTumor}
            tumorProgress={tumorProgress}
          />
        ))}
      </div>
    </div>
  )
}
