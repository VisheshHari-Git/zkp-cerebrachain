// Simulated / prototype values only — not derived from any real scan.
export const patient = {
  id: 'P-1024',
  age: 47,
  studyDate: '2026-08-14',
}

export const modalities = ['T1', 'T1Gd', 'T2', 'FLAIR']

export const viewPlanes = ['Axial', 'Coronal', 'Sagittal']

export const scanStages = [
  { key: 'volume', label: 'Scanning MRI Volume...' },
  { key: 'flair', label: 'Analyzing FLAIR...' },
  { key: 't1gd', label: 'Analyzing T1Gd...' },
  { key: 't2', label: 'Analyzing T2...' },
  { key: 'done', label: 'Multi-Modal Analysis Complete' },
]

export const segmentationStages = [
  { key: 'scanning', label: 'Scanning', progress: 0 },
  { key: 'suspected', label: 'Suspected Region', progress: 30 },
  { key: 'segmenting', label: 'AI Segmentation', progress: 70 },
  { key: 'complete', label: 'Segmentation Complete', progress: 100 },
]
