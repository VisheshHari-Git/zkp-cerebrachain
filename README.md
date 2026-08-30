# ZKP CerebraChain

**Federated Zero-Knowledge Multi-Modal Neuroimaging (MRI) Diagnostic Network**

A frontend prototype demonstrating how hospitals could collaboratively train an AI brain-MRI
tumor segmentation model — without ever sharing raw patient scans — by combining federated
learning, zero-knowledge proofs, and a blockchain audit trail.

> **This is a frontend simulation.** No real medical diagnosis, model training, zk-SNARK
> generation, or blockchain transaction happens in this codebase. Every AI result, proof, and
> chain record is mock data driven by a UI state machine, built so the same components can later
> be wired to real backend, ML, ZK, and chain services.

---

## Overview

The demo walks through one continuous story:

```
Hospital MRI → Local 3D-UNet → Model Update → ZK Proof
            → FedAvg → Global Model → IPFS → Blockchain
```

At every step, only a **verified model update** — never a raw scan — is shown crossing the
network. The `/analysis` page runs this entire pipeline end-to-end as an interactive demo; the
`/dashboard` page shows the doctor-facing view of a single patient's results.

## Architecture

```
Landing Page  ──▶  Start MRI Analysis  ──▶  Full Pipeline (/analysis)
                                              │
                                              ▼
                    MRI Scan → 3D-UNet Inference → Tumor Segmentation
                                              │
                                              ▼
                                     ZK Verification
                                              │
                                              ▼
                      Federated Hospital Network → FedAvg → Global Model
                                              │
                                              ▼
                              IPFS Storage → Blockchain Confirmation
                                              │
                                              ▼
                                Doctor Dashboard (/dashboard)
```

The pipeline is driven by a single state machine (`src/context/DemoStateContext.jsx`):

```
IDLE → SCANNING → ANALYZING → SEGMENTING → ZK_VERIFYING
     → FEDERATED_AGGREGATION → BLOCKCHAIN_CONFIRMATION → COMPLETE
```

Each stage lights up a different section of the `/analysis` page and hands off to the next one
automatically when its animation completes.

## Tech Stack

| Layer        | Choice                                          |
|--------------|--------------------------------------------------|
| Framework    | React 19 + Vite                                  |
| Styling      | Tailwind CSS v4 (`@tailwindcss/vite`)             |
| 3D           | Three.js, `@react-three/fiber`, `@react-three/drei` |
| Motion       | Framer Motion                                     |
| Icons        | Lucide React                                      |
| Routing      | React Router                                      |

No paid or external APIs are required — the holographic brain is generated procedurally
(fibonacci-sphere point cloud + wireframe shell) and MRI slices are SVG noise-filter placeholders.

## Folder Structure

```
src/
├── components/
│   ├── Navbar/               Site navigation + doctor dashboard CTA
│   ├── Hero/                 Landing hero with 3D brain
│   ├── BrainSimulation/      Brain.jsx, ScanBeam.jsx, BrainScene.jsx (R3F canvas)
│   ├── MRIViewer/            MRISlice.jsx, MRIViewer.jsx, ScanStatus.jsx
│   ├── MRIControls/          Modality tab selector
│   ├── TumorSegmentation/    Segmentation progress animation
│   ├── ZKVerification/       ZK-SNARK verification flow
│   ├── FederatedNetwork/     Hospital network diagram
│   ├── HospitalNode/         Single hospital card
│   ├── FedAvgVisualization/  Aggregation animation
│   ├── BlockchainStatus/     Chain confirmation card
│   ├── IPFSStatus/           IPFS storage card
│   ├── Footer/
│   └── shared/                GlassCard, SectionHeading, StatusPill, HowItWorks,
│                               SecuritySection, ModelStatusCard
│
├── pages/
│   ├── Home/                 Landing page
│   ├── Dashboard/             Doctor dashboard (/dashboard)
│   └── Analysis/              Full pipeline demo (/analysis)
│
├── data/                     hospitals.js, mriData.js, modelData.js — all mock data
├── animations/                brainAnimation.js — procedural brain geometry
├── hooks/                     useStagedSequence.js — drives multi-step UI animations
├── context/                    DemoStateContext.jsx — pipeline state machine
├── App.jsx
├── main.jsx
└── index.css
```

## Install & Run

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

Requires Node.js 18+.

## Prototype Flow

1. **Landing page** — pitch, architecture overview, and a live preview of the scan animation.
2. **`/analysis`** — click *Start Full Pipeline* to run the entire simulated flow: MRI scan →
   AI inference → segmentation → ZK verification → federated aggregation → IPFS/blockchain.
3. **`/dashboard`** — patient-facing view (`P-1024`) with modality tabs, axial/coronal/sagittal
   simulated slices, and the AI analysis summary (Dice score, confidence, model version).

All numeric results (Dice score, confidence, proof IDs, CIDs, tx hashes) are hard-coded demo
values, clearly labeled as prototype/simulated throughout the UI.

## Future Backend Integration

Replace the mock data in `src/data/` and the timers in `src/hooks/useStagedSequence.js` with real
API calls (e.g. REST/GraphQL endpoints) that report actual job status for each pipeline stage.
The `DemoStateContext` state machine is already shaped to drive real async work instead of
`setTimeout` sequences — swap `advance()` calls for promise resolutions.

## Future ML Integration

`ModelStatusCard` and `TumorSegmentation` are built to accept a `running` flag and an
`onComplete` callback — point these at a real 3D-UNet inference service (local or hospital-side)
that streams preprocessing/feature-extraction/segmentation/validation status, and replace the
placeholder Dice score/confidence with real model output.

## Future ZKP Integration

`ZKVerification` currently simulates the zk-SNARK step sequence and proof ID. In production, this
would call a proving service (e.g. based on circom/snarkjs or a similar toolkit) to generate a
real proof attesting to training/gradient integrity, and verify it either client-side or via a
verifier contract — without ever transmitting raw MRI data or model weights in the clear.

## Future Blockchain Integration

`IPFSStatus` and `BlockchainStatus` currently show mock CIDs and transaction hashes. In
production, the aggregated global model would be pinned to IPFS, its content hash written to an
EVM smart contract, and the resulting transaction hash/CID surfaced here from a real chain
connection (e.g. via ethers.js/viem) instead of static mock data.

---

*Hackathon prototype — all AI, ZK-proof, and blockchain output shown is simulated for
demonstration purposes only.*
