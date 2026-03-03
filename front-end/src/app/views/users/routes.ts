import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { title: 'Users' },
    children: [
      { path: 'patients', loadComponent: () => import('./patients/patients.component').then(m => m.PatientsComponent) },
      { path: 'patients/new', loadComponent: () => import('./patients/patient-form.component').then(c => c.PatientFormComponent) },
      { path: 'patients/:id', loadComponent: () => import('./patients/patient-detail.component').then(c => c.PatientDetailComponent) },
      { path: 'patients/:id/edit', loadComponent: () => import('./patients/patient-form.component').then(c => c.PatientFormComponent) },
      { path: 'physicians', loadComponent: () => import('./physicians/physicians.component').then((c) => c.PhysiciansComponent) },
      { path: 'physicians/new', loadComponent: () => import('./physicians/physicians-form.component').then(c => c.PhysicianFormComponent) },
      { path: 'physicians/:id', loadComponent: () => import('./physicians/physicians-detail.component').then(c => c.PhysicianDetailComponent) },
      { path: 'physicians/:id/edit', loadComponent: () => import('./physicians/physicians-form.component').then(c => c.PhysicianFormComponent) },
      { path: 'nurses', loadComponent: () => import('./nurses/nurses.component').then((c) => c.NursesComponent) },
      { path: 'nurses/new', loadComponent: () => import('./nurses/nurses-form.component').then(c => c.NurseFormComponent) },
      { path: 'nurses/:id', loadComponent: () => import('./nurses/nurses-detail.component').then(c => c.NurseDetailComponent) },
      { path: 'nurses/:id/edit', loadComponent: () => import('./nurses/nurses-form.component').then(c => c.NurseFormComponent) },
      { path: 'coordinators', loadComponent: () => import('./coordinators/coordinators.component').then(m => m.CoordinatorsComponent) },
      { path: 'coordinators/new', loadComponent: () => import('./coordinators/coordinators-form.component').then(c => c.CoordinatorFormComponent) },
      { path: 'coordinators/:id', loadComponent: () => import('./coordinators/coordinators-detail.component').then(c => c.CoordinatorDetailComponent) },
      { path: 'coordinators/:id/edit', loadComponent: () => import('./coordinators/coordinators-form.component').then(c => c.CoordinatorFormComponent) },
      { path: 'auditors', loadComponent: () => import('./auditors/auditors.component').then(m => m.AuditorsComponent) },
      { path: 'auditors/new', loadComponent: () => import('./auditors/auditors-form.component').then(c => c.AuditorFormComponent) },
      { path: 'auditors/:id', loadComponent: () => import('./auditors/auditors-detail.component').then(c => c.AuditorDetailComponent) },
      { path: 'auditors/:id/edit', loadComponent: () => import('./auditors/auditors-form.component').then(c => c.AuditorFormComponent) }
    ]
  }
];