export const evidenceRecords = [
  {
    component: 'C2',
    metric: 'Held-out AUROC',
    value: '0.5205',
    context: 'GLOBEM / GATv2',
    status: 'experimental',
    note: 'Participant-grouped external evaluation.',
    limitation: 'Held-out discrimination was not distinguishable from chance under the project evaluation.',
  },
  {
    component: 'C2',
    metric: '95% clustered CI',
    value: '0.485–0.560',
    context: 'Participant-clustered interval',
    status: 'experimental',
    note: 'Interval overlaps chance-level discrimination.',
  },
  {
    component: 'C2',
    metric: 'Permutation null',
    value: '0.4991',
    context: '50 permutations',
    status: 'experimental',
    note: 'Empirical p-value 0.255.',
  },
  {
    component: 'C2',
    metric: 'Active fusion weight',
    value: '0.0',
    context: 'Current evidence gate',
    status: 'experimental',
    note: 'EXPERIMENTAL / EXCLUDED from active fusion under the current validation rule.',
  },
  {
    component: 'C3',
    metric: 'Held-out AUROC',
    value: '≈0.738',
    context: 'Deployment-relevant clinical-note setting',
    status: 'current',
    note: 'Patient-disjoint few-shot benchmark.',
  },
]

export const unavailableEvidenceExample = {
  component: 'C3',
  metric: 'Current note evidence',
  value: null,
  context: 'No current clinical note',
  status: 'unavailable',
  note: 'Evidence is unavailable.',
}
