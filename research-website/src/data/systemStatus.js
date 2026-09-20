export const systemStates = {
  current: {
    status: 'current',
    label: 'CURRENT',
    description: 'Verified repository behavior used for current-state presentation.',
  },
  target: {
    status: 'target',
    label: 'TARGET',
    description: 'Required target architecture; not necessarily implemented.',
  },
  proposed: {
    status: 'proposed',
    label: 'PROPOSED',
    description: 'Engineering remediation recommendation; not current behavior.',
  },
}

export const currentAssessment = {
  kind: 'assessment',
  status: 'current',
  label: 'Current multimodal assessment',
  identity: 'fusion_result_id',
}

export const physiologicalForecast = {
  kind: 'forecast',
  status: 'current',
  scope: 'physiological',
  label: 'Near-term physiological forecast',
  identity: 'forecast_result_id',
}

export const audienceProjections = [
  { audience: 'patient', source: 'fusion_result_id', recomputesFusion: false },
  { audience: 'clinician', source: 'fusion_result_id', recomputesFusion: false },
]

export const currentSystemNodes = [
  { id: 'patient', label: 'Patient App', status: 'current' },
  { id: 'clinician', label: 'ClinAnx', status: 'current' },
  { id: 'backend', label: 'Central Backend', status: 'current' },
  { id: 'fusion', label: 'Authoritative FusionResult', status: 'current' },
]

export const targetSystemNodes = [
  { id: 'auth', label: 'Assignment-aware authorization', status: 'target' },
  { id: 'forecast', label: 'Persisted ForecastResult contract', status: 'target' },
  { id: 'events', label: 'Persistent AttentionEvent lifecycle', status: 'target' },
  { id: 'notifications', label: 'Shared event notification delivery', status: 'target' },
]
