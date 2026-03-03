export interface Auditor { id: number; name: string; department: string; notes?: string }

let auditors: Auditor[] = [
  { id: 1, name: 'Alice Martin', department: 'Quality', notes: 'Lead auditor' },
  { id: 2, name: 'Bruno Lopez', department: 'Compliance', notes: '' },
  { id: 3, name: 'Chantal Dupre', department: 'Internal', notes: 'Part-time' }
];

export function getAuditors() { return auditors.slice(); }
export function getAuditor(id: number) { return auditors.find(a => a.id === id); }
export function addAuditor(a: Partial<Auditor>) { const id = auditors.length ? Math.max(...auditors.map(x => x.id)) + 1 : 1; auditors.push({ id, name: a.name||'', department: a.department||'', notes: a.notes }); }
export function updateAuditor(a: Auditor) { const idx = auditors.findIndex(x => x.id === a.id); if (idx >= 0) auditors[idx] = a; }
export function deleteAuditor(id: number) { auditors = auditors.filter(x => x.id !== id); }
