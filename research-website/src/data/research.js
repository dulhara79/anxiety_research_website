export const project = {
  code: 'R26—DS—012',
  codeAscii: 'R26-DS-012',
  institution: 'SLIIT',
  year: '2026',
  title: 'A Multimodal Digital Biomarker Framework for Personalized Vulnerability Mapping and Acute Escalation Forecasting in Young Adults with Anxiety Disorders',
  headline: 'Understanding anxiety vulnerability across multiple timescales.',
  summary: 'A multimodal research framework combining physiological forecasting, leakage-audited behavioural evaluation, clinical language modelling and reliability-aware evidence fusion.',
  thesis: 'Anxiety-related change is not expressed through a single signal—and different modalities should not be treated as equally reliable evidence.',
  repository: 'https://github.com/dulhara79/R26-DS-012',
  websiteRepository: 'https://github.com/dulhara79/anxiety_research_website',
}

export const components = [
  {
    key: 'c1', id: 'C1', stateId: '01', owner: 'Sendanayake H.D.', shortName: 'Physiology', displayTitle: 'PHYSIOLOGY',
    title: 'Wearable physiological forecasting',
    question: 'Can individualized physiological deviation provide useful short-horizon evidence of escalation?',
    method: 'Self-supervised LSTM autoencoder over wearable physiological windows, followed by short-horizon forecasting.',
    data: 'WESAD · AffectiveROAD · PPG-DaLiA · EmoWear',
    status: 'Active research signal',
    evidence: 'Subject-level evaluation and personalization experiments.',
    limitation: null,
    accent: '#6FD6E8',
    visualDescription: 'Abstract simulated physiological traces showing rhythmic windows, baseline deviation and short-horizon forecast trajectories. Decorative signals are not patient data.',
    metrics: {},
  },
  {
    key: 'c2', id: 'C2', stateId: '02', owner: 'Layathma B.M.A.S.', shortName: 'Behaviour', displayTitle: 'BEHAVIOUR',
    title: 'Leakage-free behavioural graph evaluation',
    question: 'Do temporal behavioural graphs generalize beyond simpler passive-sensing baselines?',
    method: 'GATv2 on 28-day GLOBEM graphs with participant-grouped, cross-cohort evaluation.',
    data: 'GLOBEM · INS-W_1–4',
    status: 'Active fusion weight 0.0',
    evidence: 'Held-out AUROC 0.5205 · 95% clustered CI 0.485–0.560 · permutation null 0.4991 · empirical p-value 0.255.',
    limitation: 'The final held-out result was not distinguishable from chance; the graph model did not outperform simpler baselines.',
    accent: '#C9A86A',
    visualDescription: 'Abstract participant-grouped behavioural graph with temporal windows and cohort boundaries. The graph attenuates at the validation gate because the current active fusion weight is zero.',
    metrics: { auroc: '0.5205', ci: '0.485–0.560', null: '0.4991', p: '0.255', fusionWeight: '0.0' },
  },
  {
    key: 'c3', id: 'C3', stateId: '03', owner: 'Kaushalya I.G.D.', shortName: 'Clinical NLP', displayTitle: 'CLINICAL NLP',
    title: 'Patient-disjoint clinical NLP / TC-WPN',
    question: 'Can few-shot clinical NLP learn from small support sets without patient leakage or label contamination?',
    method: 'Bio_ClinicalBERT → 256-d projection → Temporal-Consistency Weighted Prototypical Network.',
    data: 'MIMIC-IV · MIMIC-III transfer',
    status: 'Deployment-relevant held-out AUROC ≈0.738',
    evidence: 'Patient-disjoint episodes · leakage certificates · frozen episode plans.',
    limitation: null,
    accent: '#A99AF4',
    visualDescription: 'Synthetic clinical-note fragments transform into tokens, latent points, class support sets and prototypes. No real patient text is displayed.',
    metrics: { setting: 'Patient-disjoint few-shot benchmark', auroc: '≈0.738' },
  },
  {
    key: 'c4', id: 'C4', stateId: '04', owner: 'Seneviratne K.A.U.A.', shortName: 'Fusion', displayTitle: 'FUSION',
    title: 'Reliability-weighted fusion + CARE-AnxRAG',
    question: 'How should heterogeneous evidence be combined when modalities differ in recency, reliability and validation quality?',
    method: 'Contextual prior + eligible modality outputs → reliability-weighted fusion → evidence-aware retrieval and abstention.',
    data: 'Component outputs · contextual variables · evidence corpus',
    status: 'Research decision-support layer',
    evidence: 'Missing/unreliable modalities can be masked; insufficient evidence can abstain.',
    limitation: null,
    accent: '#C7F0D5',
    visualDescription: 'Eligible signal streams approach a reliability gate with unequal contribution. The behavioural stream is visibly withheld before downstream evidence retrieval and abstention.',
    metrics: {},
  },
]

export const componentByKey = Object.fromEntries(components.map((component) => [component.key, component]))

export const researchStates = {
  overview: {
    id: '00', key: 'overview', shortName: 'Framework', title: 'MULTIMODAL', next: 'c1',
    headline: project.headline,
    question: project.thesis,
    method: 'Independent signal families are evaluated before eligible evidence is combined.',
    data: 'Physiology · Behaviour · Clinical language · Context',
    evidence: 'Reliability and validation determine influence; architectural symmetry does not.',
    accent: '#F4F5F2',
    visualDescription: 'Four independent signal families approach a common evidence core while remaining visually distinguishable.',
  },
  c1: { ...componentByKey.c1, next: 'c2' },
  c2: { ...componentByKey.c2, next: 'c3' },
  c3: { ...componentByKey.c3, next: 'c4' },
  c4: { ...componentByKey.c4, next: 'evidence' },
}

export const evidence = [
  { component: 'C2', metric: 'Held-out AUROC', value: '0.5205', context: 'GLOBEM / GATv2', note: 'Participant-grouped external evaluation.' },
  { component: 'C2', metric: '95% clustered CI', value: '0.485–0.560', context: 'Participant-clustered interval', note: 'Interval overlaps chance-level discrimination.' },
  { component: 'C2', metric: 'Permutation null', value: '0.4991', context: '50 permutations', note: 'Empirical p-value 0.255.' },
  { component: 'C2', metric: 'Active fusion weight', value: '0.0', context: 'Current evidence gate', note: 'Excluded from active fusion under the current validation rule.' },
  { component: 'C3', metric: 'Held-out AUROC', value: '≈0.738', context: 'Deployment-relevant clinical-note setting', note: 'Patient-disjoint few-shot benchmark.' },
]

export const methodology = [
  { id: '01', title: 'Research design', body: 'The framework evaluates modalities separately because physiology, passive behaviour and clinical text operate on different timescales and have different validation contracts.' },
  { id: '02', title: 'Leakage control', body: 'Behavioural evaluation is participant-grouped across GLOBEM cohorts. Clinical NLP uses patient-disjoint support/query construction, frozen episode plans and explicit leakage certificates.' },
  { id: '03', title: 'Reliability-weighted fusion', body: 'Eligible modality weights combine deployment-relevant informativeness, recency and reliability. Unavailable modalities are masked rather than interpreted as zero risk.' },
  { id: '04', title: 'Decision rule', body: 'A contextual prior cannot produce a tier by itself. The system may return insufficient evidence when eligible evidence is not adequate.' },
  { id: '05', title: 'CARE-AnxRAG', body: 'Hybrid dense + lexical retrieval, reranking, authority/freshness scoring, contradiction checks, provenance and calibrated abstention support evidence-aware retrieval.' },
  { id: '06', title: 'Research safety', body: 'The integrated framework is research / clinical decision support, not a diagnostic device.' },
]

export const fusionEquation = ['w_m(t) = ω_m × ρ_m(Δt) × c_m', 'α_m = w_m / Σw', 'S(t) = Σ α_m × p_m']

export const safetyPrinciples = [
  'This framework is for research and clinical decision support. It is not a diagnostic device.',
  'Unavailable evidence must not automatically become zero risk.',
  'The framework may return insufficient evidence rather than manufacture certainty.',
]

export const people = [
  ['Sendanayake H.D.', 'IT22107596', 'C1 · Wearable physiological forecasting'],
  ['Layathma B.M.A.S.', 'IT22171542', 'C2 · Behavioural graph learning'],
  ['Kaushalya I.G.D.', 'IT22130648', 'C3 · Clinical NLP / TC-WPN'],
  ['Seneviratne K.A.U.A.', 'IT22093950', 'C4 · Fusion + CARE-AnxRAG'],
]

export const supervisors = [
  ['Prof. Samantha Thelijjagoda', 'Research Supervisor', 'SLIIT'],
  ['Dr. Mahima Weerasinghe', 'Co-Supervisor', 'SLIIT'],
  ['Dr. Chathurie Suraweera', 'External / Clinical Supervisor', 'University of Colombo / NHSL'],
]

export const navItems = [
  ['Research', '/'],
  ['System', '/components'],
  ['Evidence', '/results'],
  ['Methodology', '/methodology'],
  ['Publications', '/publications'],
  ['People', '/team'],
]
