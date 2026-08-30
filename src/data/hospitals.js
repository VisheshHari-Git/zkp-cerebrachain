// Simulated federated network participants.
// No raw patient data ever appears in this file or crosses the wire in the UI —
// only local training status and verified model-update metadata.
export const hospitals = [
  {
    id: 'hosp-a',
    name: 'Hospital A',
    location: 'Boston, US',
    caseCount: 1284,
    modelVersion: 'v1.4-local',
    status: 'verified',
    updateId: 'Update 1',
  },
  {
    id: 'hosp-b',
    name: 'Hospital B',
    location: 'Munich, DE',
    caseCount: 942,
    modelVersion: 'v1.4-local',
    status: 'verified',
    updateId: 'Update 2',
  },
  {
    id: 'hosp-c',
    name: 'Hospital C',
    location: 'Bengaluru, IN',
    caseCount: 1731,
    modelVersion: 'v1.4-local',
    status: 'verified',
    updateId: 'Update 3',
  },
  {
    id: 'hosp-d',
    name: 'Hospital D',
    location: 'São Paulo, BR',
    caseCount: 861,
    modelVersion: 'v1.4-local',
    status: 'verified',
    updateId: 'Update 4',
  },
]
