export interface Physician {
  id: number;
  name: string;
  specialty: string;
  age?: number;
  notes?: string;
}

let _physicians: Physician[] = [
  { id: 1, name: 'Dr. Samir Toumi', specialty: 'Cardiology', age: 49, notes: 'Available on Mon/Wed' },
  { id: 2, name: 'Dr. Leila Mansour', specialty: 'Endocrinology', age: 42, notes: 'Diabetes specialist' },
  { id: 3, name: 'Dr. Karim Farhat', specialty: 'Pulmonology', age: 38, notes: 'Asthma & COPD' }
];

export function getPhysicians(): Physician[] { return _physicians; }
export function getPhysician(id: number): Physician | undefined { return _physicians.find(p => p.id === id); }
export function addPhysician(p: Omit<Physician, 'id'>): Physician {
  const id = _physicians.length ? Math.max(..._physicians.map(x => x.id)) + 1 : 1;
  const physician: Physician = { id, ...p } as Physician;
  _physicians = [..._physicians, physician];
  return physician;
}
export function updatePhysician(updated: Physician): Physician | undefined {
  const idx = _physicians.findIndex(p => p.id === updated.id);
  if (idx === -1) return undefined;
  _physicians = _physicians.map(p => p.id === updated.id ? updated : p);
  return updated;
}
export function deletePhysician(id: number): void { _physicians = _physicians.filter(p => p.id !== id); }
