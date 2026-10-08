<div align="center">

# R26-DS-012 · Research Website

### Understanding anxiety beyond a single moment.

**A Multimodal Digital Biomarker Framework for Personalized Vulnerability Mapping and Acute Escalation Forecasting in Young Adults with Anxiety Disorders**

[![SLIIT](https://img.shields.io/badge/SLIIT-Research%20Project-0057A8?style=for-the-badge)](https://www.sliit.lk/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=111827)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Research](https://img.shields.io/badge/Status-Academic%20Research-2F6F68?style=for-the-badge)](https://github.com/dulhara79/R26-DS-012)

<br />

**Four research components · one evidence-aware framework · one research story**

</div>

---

## ✦ About

This repository contains the interactive research website for **R26-DS-012**, a final-year SLIIT research project exploring how physiological, behavioural, clinical-language and contextual signals can contribute to **personalized anxiety vulnerability mapping and short-horizon escalation assessment**.

The website is not the research model itself. It is the **public-facing research layer**: a place to explain the methodology, present validated findings, document the system architecture, introduce the research team, and make the evidence understandable without hiding its limitations.

> **Research use only.** This project is a research and clinical decision-support prototype. It is **not a diagnostic device**, and website content or model outputs must not be interpreted as a diagnosis of an anxiety disorder.

---

## ◇ The research, in four components

| Component | Focus | Core question |
|---|---|---|
| **C1 · Physiology** | Wearable biosensors | Can a model learn an individual's physiological baseline and identify short-horizon change? |
| **C2 · Behaviour** | Spatio-temporal phenotyping | Does structure in longitudinal passive behaviour add generalizable signal? |
| **C3 · Clinical NLP** | TC-WPN | Can anxiety-related clinical language be modelled under strict patient-disjoint, leakage-controlled evaluation? |
| **C4 · Fusion + RAG** | Reliability-aware integration | How should heterogeneous evidence be weighted, combined, retrieved and withheld when it is weak or conflicting? |

The website deliberately keeps these components on **their own terms**. Different modalities operate at different timescales, have different evidence quality, and should not automatically receive equal influence.

---

## ✦ What the website contains

### Overview
The research question, motivation, timescales, design principles and high-level evidence story.

### Research
The problem definition, research framing, multimodal rationale, methodology and safety boundaries.

### Components
Detailed pages for all four streams, including their inputs, modelling pipelines, evaluation protocols, results and role in fusion.

### System
A visual explanation of how component outputs move through validation, reliability-aware fusion and evidence support.

### Findings
A consolidated evidence record covering positive results, negative results, validation gates and limitations.

### Documents
Research papers, project material and supporting sources.

### Team
The four research components and their academic supervision structure.

---

## ◆ Evidence-first design

The website is intentionally built around a simple principle:

**A number is only useful when its context travels with it.**

That means findings are presented with their evaluation setting, validation protocol and scope rather than as isolated benchmark scores.

The current research narrative emphasizes:

- participant-specific personalization where appropriate
- leakage-free or leakage-controlled evaluation
- explicit negative findings
- modality-specific reliability
- recency and coverage in fusion
- abstention when evidence is insufficient
- clear separation between research outputs and clinical claims

The site also preserves an important distinction between **validated findings** and **historical exploratory work**.

---

## ◌ Selected research findings

The current website reflects the final results used in the research narrative.

**C1 · Physiology**
- WESAD AUROC: **0.9979**
- WESAD F1: **0.9233**
- AffectiveROAD macro AUROC: **0.8757**
- Ridge participant-macro MAE at +5 min: **0.1226**

**C2 · Behaviour**
- Held-out GATv2 AUROC: **0.5205**
- 95% participant-clustered CI: **0.485–0.560**
- Permutation-null mean: **0.4991**
- Empirical permutation p-value: **0.255**

**C3 · Clinical NLP**
- Mean AUROC across five seeds: **0.7377**
- AUROC SD: **0.0031**

**C4 · Fusion + RAG**
- Contextual/demographic AUROC: **0.6220**
- Expected calibration error: **0.0023**
- Behavioural base fusion weight: **0.000**

These figures are presented as research findings within their defined evaluation scopes, not as universal clinical performance claims.

---

## ⌘ Technology

The website is a React single-page application built with:

- **React 18**
- **Vite 5**
- **React Router 6**
- **Framer Motion**
- **Lucide React**
- **Tailwind CSS**
- **PostCSS / Autoprefixer**

The project uses structured data modules for research content, component definitions, team information and visual assets so that the narrative can be updated without scattering research claims throughout UI code.

---

## ▶ Run locally

```bash
cd research-website
npm install
npm run dev
```

Then open the local Vite address shown in the terminal.

### Production build

```bash
npm run build
```

The build runs the project's automated tests and content validation before creating the production bundle.

### Preview the production build

```bash
npm run preview
```

---

## 🧪 Quality checks

The project includes automated checks for research-content consistency.

```bash
npm test
npm run validate
```

Or run the complete build pipeline:

```bash
npm run build
```

The intention is simple: **presentation changes should not silently break documented research facts.**

---

## 📁 Project structure

```text
research-website/
├── public/
│   ├── images/
│   └── media/
├── src/
│   ├── components/
│   │   ├── hero/
│   │   ├── layout/
│   │   ├── research/
│   │   └── ui/
│   ├── data/
│   │   ├── architecture.js
│   │   ├── components.js
│   │   ├── documents.js
│   │   ├── research.js
│   │   ├── site.js
│   │   └── team.js
│   └── pages/
│       ├── Home.jsx
│       ├── Research.jsx
│       ├── Components.jsx
│       ├── ComponentDetail.jsx
│       ├── System.jsx
│       ├── Findings.jsx
│       ├── Documents.jsx
│       ├── Team.jsx
│       └── Contact.jsx
├── scripts/
├── tests/
├── IMAGES.md
├── package.json
└── README.md
```

---

## 🖼 Visual direction

The interface follows an editorial research aesthetic rather than a conventional dashboard:

**cinematic imagery · restrained scientific UI · serif-led research typography · motion with purpose · evidence cards · readable tables · explicit uncertainty states**

The visual system is designed to make a complex multimodal research project feel approachable without making the science look simpler than it is.

---

## 🔗 Related repository

The research implementation, experiments, component repositories and supporting artefacts live in the main project repository:

**R26-DS-012**  
https://github.com/dulhara79/R26-DS-012

This repository is the **research website layer** for that project.

---

## 🎓 Institution

**Sri Lanka Institute of Information Technology (SLIIT)**  
Department of Computer Science  
B.Sc. (Hons) Information Technology, Specialized in Data Science  
2026

---

<div align="center">

### Research should be understandable without becoming less rigorous.

**R26-DS-012 · SLIIT · 2026**

</div>
