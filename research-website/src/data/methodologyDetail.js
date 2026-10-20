// Summaries from five unpublished October 2026 research draft reports.
// Results are component-level evidence, not clinical validation of the integrated system.
export const componentMethodologies = [
 {id:"C1",title:"Wearable physiology and near-term anomaly forecasting",author:"H. D. Sendanayake",
  data:"WESAD chest-sensor baseline and stress recordings from 13 retained participants; AffectiveROAD is an external driving-domain check. The custom chest strap has not supplied prospective validation data for these results.",
  preparation:"Extract ten cardiac, breathing, temperature and movement features in non-overlapping one-minute windows; normalize using baseline-only participant statistics and reject unusable windows.",
  model:"Train a baseline-only, unmasked LSTM autoencoder on five-minute sequences. Transform reconstruction error into a bounded anomaly score; use two preceding five-minute scores with a direct multi-output Ridge regressor to estimate +5 and +10 minute scores.",
  evaluation:"Use leave-one-subject-out WESAD anomaly tests, participant-held-out forecast mean absolute error versus persistence with bootstrap uncertainty, and external AffectiveROAD checks.",
  finding:"Reported WESAD anomaly AUROC 0.9979 and external AffectiveROAD pooled AUROC 0.8650. Average forecast improvements had participant-bootstrap intervals containing zero.",
  limit:"A forecast of a physiological anomaly score is not a prediction of a clinically confirmed anxiety attack.",refs:["D-C1","WESAD","ROAD"]},
 {id:"C2",title:"Spatio-temporal behavioural graph learning",author:"B. M. A. S. Layathma",
  data:"GLOBEM v1.1 passive smartphone sensing (2018 development cohort; 2019–2021 held-out cohorts); weekly PHQ-4 anxiety-subscale labels.",
  preparation:"Construct 28-day day-by-segment graphs from location, screen, Bluetooth and step features with explicit missingness indicators. Group evaluation by participant and normalize within folds.",
  model:"Evaluate GATv2 with within-day and across-day graph edges against flat feature baselines and a 50-draw prevalence-preserving permutation null.",
  evaluation:"Freeze model selection on 2018; assess three held-out cohorts, 547 participant-years, plus leave-one-cohort-out shift and clinical net benefit.",
  finding:"Reported AUROC 0.5205 (95% CI 0.485–0.560), permutation null 0.4991 (p = 0.255). Flat baselines performed better; no demonstrated clinical net benefit.",
  limit:"Behavioural risk scores are withheld from active fusion (zero weight); the mobile feature provides descriptive personal-baseline observations instead.",refs:["D-C2","GLOBEM","GATV2"]},
 {id:"C3",title:"Patient-disjoint few-shot clinical note classification",author:"I. G. D. Kaushalya",
  data:"MIMIC-IV diagnosis-coded patient categories paired with MIMIC-IV-Note text; anxiety-coded patients versus psychiatric comparators.",
  preparation:"Use structured diagnosis codes instead of note keywords for labels; separate patients across train, validation and test, exclude support/query overlap and apply an explicit index-time admissibility policy.",
  model:"Bio_ClinicalBERT embeddings projected to 256 dimensions and compared to few-shot class prototypes; investigate temporal-recency and prototype-consistency weights.",
  evaluation:"Frozen support/query episodes, five seeds, matched auxiliary-only comparison, controlled ablations and anxiety-lexicon blinding.",
  finding:"Draft mean held-out AUROC 0.7377, versus auxiliary-only 0.7371 (paired difference +0.0006; reported p = 0.8864). Independent weighting superiority is not established.",
  limit:"This is concurrent classification of anxiety-coded clinical records, not clinical diagnosis or prospective escalation forecasting.",refs:["D-C3","MIMIC","BERT","PROTO"]},
 {id:"C4",title:"Demographic-contextual priors and reliability-aware fusion",author:"K. A. U. A. Seneviratne",
  data:"Demographic and GAD-7 questionnaire-associated contextual model; separate C1 and C3 outputs; controlled fusion fixtures and exploratory evidence queries.",
  preparation:"Track reference provenance, availability, time freshness, confidence and coverage; exclude C2 and constrain demographic weight before fusion.",
  model:"DCAR provides a demographic prior, RAGF combines eligible sources, CARE-X audits contributions and counterfactuals, and separate CARE-AnxRAG retrieves cited evidence with abstention.",
  evaluation:"DCAR held-out evaluation, ten fusion scenarios and 8,000 seeded policy simulations, stored CARE-X arithmetic and exploratory retrieval/provenance checks.",
  finding:"Draft reports DCAR AUROC 0.6137 on 4,854 held-out records; policy and arithmetic checks validate implementation properties, not clinical efficacy.",
  limit:"The integrated composite lacks matched independent patient outcomes sufficient to establish validated clinical prediction or benefit.",refs:["D-C4","D-GROUP","TRIPOD"]}
];
export const integratedPrinciples=[
 {title:"Distinct targets and clocks",detail:"C1 forecasts physiological scores (+5/+10 minutes); C2 tests retrospective weekly associations but is excluded; C3 detects ICD-associated clinical notes concurrently. These outputs cannot be equated with the same clinical event."},
 {title:"Authoritative, quality-gated result",detail:"A central backend maintains participant identity, eligibility, persisted fusion results and controlled access for the Aura participant app and ClinAnx clinician app. Missing or stale evidence is not encoded as low risk."},
 {title:"Evidence limits",detail:"The group draft reports collection involving eight NHSL psychiatric-ward patients, but does not provide matched independent clinical outcomes establishing multimodal forecast performance or efficacy."}
];
export const methodologyReferences=[
 {id:"D-C1",title:"H. D. Sendanayake (2026), Physiological component thesis draft",detail:"IT22107596_DRAFT.pdf · Chapters 3 and 6",url:null},
 {id:"D-C2",title:"B. M. A. S. Layathma (2026), Behavioural graph learning thesis draft",detail:"IT22171542_DRAFT.pdf · Chapters 3 and 6",url:null},
 {id:"D-C3",title:"I. G. D. Kaushalya (2026), TC-WPN thesis draft",detail:"IT22130648_DRAFT.pdf · Chapters 3 and 6",url:null},
 {id:"D-C4",title:"K. A. U. A. Seneviratne (2026), Fusion and evidence thesis draft",detail:"IT22093950_DRAFT.pdf · Chapters 3 and 6",url:null},
 {id:"D-GROUP",title:"R26-DS-012 (2026), Common integrated solution draft",detail:"R26-DS-012_DRAFT.pdf · Chapters 3–6",url:null},
 {id:"WESAD",title:"Schmidt et al. (2018), Introducing WESAD",detail:"ACM ICMI · DOI 10.1145/3242969.3242985",url:"https://doi.org/10.1145/3242969.3242985"},
 {id:"ROAD",title:"El Haouij et al. (2018), AffectiveROAD",detail:"ACM SAC · DOI 10.1145/3167132.3167395",url:"https://doi.org/10.1145/3167132.3167395"},
 {id:"GLOBEM",title:"Xu et al. (2022), GLOBEM Dataset",detail:"NeurIPS Datasets and Benchmarks Track",url:"https://proceedings.neurips.cc/paper_files/paper/2022/file/9c7e8a0821dfcb58a9a83cbd37cc8131-Paper-Datasets_and_Benchmarks.pdf"},
 {id:"GATV2",title:"Brody, Alon and Yahav (2022), How Attentive Are Graph Attention Networks?",detail:"ICLR",url:"https://openreview.net/forum?id=F72ximsx7C1"},
 {id:"MIMIC",title:"Johnson et al. (2023), MIMIC-IV",detail:"Scientific Data · DOI 10.1038/s41597-022-01899-x",url:"https://doi.org/10.1038/s41597-022-01899-x"},
 {id:"BERT",title:"Alsentzer et al. (2019), Publicly Available Clinical BERT Embeddings",detail:"Clinical NLP Workshop · DOI 10.18653/v1/W19-1909",url:"https://doi.org/10.18653/v1/W19-1909"},
 {id:"PROTO",title:"Snell, Swersky and Zemel (2017), Prototypical Networks for Few-shot Learning",detail:"NeurIPS",url:"https://papers.neurips.cc/paper/6996-prototypical-networks-for-few-shot-learning"},
 {id:"TRIPOD",title:"Collins et al. (2024), TRIPOD+AI Statement",detail:"BMJ · DOI 10.1136/bmj-2023-078378",url:"https://doi.org/10.1136/bmj-2023-078378"}
];
