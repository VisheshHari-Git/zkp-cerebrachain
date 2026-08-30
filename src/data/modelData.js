// All values below are simulated prototype placeholders for demo purposes.
// They are not produced by a real model, prover, or chain.

export const modelInfo = {
  name: '3D-UNet',
  version: '3D-UNet v1.4',
  diceScore: '94.2%',
  confidence: '96.8%',
}

export const modelPipelineSteps = [
  { key: 'preprocessing', label: 'Preprocessing' },
  { key: 'feature', label: 'Feature Extraction' },
  { key: 'segmentation', label: 'Segmentation' },
  { key: 'validation', label: 'Validation' },
]

export const zkSteps = [
  'Generating ZK Proof...',
  'Validating DICOM...',
  'Checking Training Integrity...',
  'Checking Gradient Integrity...',
  'Verifying Proof...',
]

export const zkResult = {
  proofId: 'zkSNARK_7F92B1C4...A81C',
  dicomIntegrity: 'VERIFIED',
  trainingIntegrity: 'VERIFIED',
  gradientIntegrity: 'VERIFIED',
  proofStatus: 'VALID',
}

export const fedAvgResult = {
  globalModelVersion: 'Global Model v1.4',
}

export const chainRecord = {
  modelVersion: 'v1.4',
  ipfsCid: 'bafybeigdyrzt5sfp7...m7x92',
  txHash: '0x8f72a3e1c9b6d40f...a921',
  network: 'EVM Test Network (Simulated)',
}
