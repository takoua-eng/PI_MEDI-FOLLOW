export interface Patient {
  id: number;
  name: string;
  disease: string;
  age?: number;
  notes?: string;
}

let _patients: Patient[] = [
  { id: 1, name: 'Saad Ben Ali', disease: 'Diabetes', age: 54, notes: 'Under insulin therapy' },
  { id: 2, name: 'Amina Khelifi', disease: 'Hypertension', age: 62, notes: 'Monitoring blood pressure' },
  { id: 3, name: 'Walid Haddad', disease: 'Asthma', age: 29, notes: 'Uses inhaler occasionally' },
  { id: 4, name: 'Noura Abdel', disease: 'Migraine', age: 36, notes: 'Frequent headaches' }
];

export function getPatients(): Patient[] {
  return _patients;
}

export function getPatient(id: number): Patient | undefined {
  return _patients.find(p => p.id === id);
}

export function addPatient(p: Omit<Patient, 'id'>): Patient {
  const id = _patients.length ? Math.max(..._patients.map(x => x.id)) + 1 : 1;
  const patient: Patient = { id, ...p } as Patient;
  _patients = [..._patients, patient];
  return patient;
}

export function updatePatient(updated: Patient): Patient | undefined {
  const idx = _patients.findIndex(p => p.id === updated.id);
  if (idx === -1) return undefined;
  _patients = _patients.map(p => p.id === updated.id ? updated : p);
  return updated;
}

export function deletePatient(id: number): void {
  _patients = _patients.filter(p => p.id !== id);
}
