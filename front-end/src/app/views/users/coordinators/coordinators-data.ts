export interface Coordinator { id: number; name: string; unit: string; notes?: string }

let coordinators: Coordinator[] = [
  { id: 1, name: 'David Morel', unit: 'Scheduling', notes: '' },
  { id: 2, name: 'Elena Rossi', unit: 'Operations', notes: 'Part-time' }
];

export function getCoordinators() { return coordinators.slice(); }
export function getCoordinator(id: number) { return coordinators.find(a => a.id === id); }
export function addCoordinator(a: Partial<Coordinator>) { const id = coordinators.length ? Math.max(...coordinators.map(x => x.id)) + 1 : 1; coordinators.push({ id, name: a.name||'', unit: a.unit||'', notes: a.notes }); }
export function updateCoordinator(a: Coordinator) { const idx = coordinators.findIndex(x => x.id === a.id); if (idx >= 0) coordinators[idx] = a; }
export function deleteCoordinator(id: number) { coordinators = coordinators.filter(x => x.id !== id); }
