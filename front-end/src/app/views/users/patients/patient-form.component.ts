import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { addPatient, getPatient, updatePatient } from './patients-data';

@Component({
  selector: 'app-patient-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss'
})
export class PatientFormComponent {
  model: any = { name: '', disease: '', age: '', notes: '' };
  isEdit = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const p = getPatient(id);
      if (p) {
        this.model = { ...p };
        this.isEdit = true;
      }
    }
  }

  submit() {
    if (this.isEdit) {
      updatePatient(this.model);
    } else {
      addPatient({ name: this.model.name, disease: this.model.disease, age: this.model.age ? Number(this.model.age) : undefined, notes: this.model.notes });
    }
    this.router.navigate(['/users/patients']);
  }

  goBack() {
    this.router.navigate(['/users/patients']);
  }
}
