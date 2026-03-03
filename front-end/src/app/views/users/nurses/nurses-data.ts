export interface Nurse {
  id: number;
  name: string;
  department: string;
  age?: number;
  notes?: string;
}

let _nurses: Nurse[] = [
  { id: 1, name: 'Nurse Amina', department: 'Emergency', age: 31, notes: 'Shift: days' },
  { id: 2, name: 'Nurse Hichem', department: 'Pediatrics', age: 28, notes: 'Pediatric care' }
];

export function getNurses(): Nurse[] { return _nurses; }
export function getNurse(id: number): Nurse | undefined { return _nurses.find(p => p.id === id); }
export function addNurse(p: Omit<Nurse, 'id'>): Nurse { const id = _nurses.length ? Math.max(..._nurses.map(x => x.id)) + 1 : 1; const nurse: Nurse = { id, ...p } as Nurse; _nurses = [..._nurses, nurse]; return nurse; }
export function updateNurse(updated: Nurse): Nurse | undefined { const idx = _nurses.findIndex(p => p.id === updated.id); if (idx === -1) return undefined; _nurses = _nurses.map(p => p.id === updated.id ? updated : p); return updated; }
export function deleteNurse(id: number): void { _nurses = _nurses.filter(p => p.id !== id); }
