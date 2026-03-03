import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { addPhysician, getPhysician, updatePhysician } from './physicians-data';

@Component({
  selector: 'app-physician-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './physicians-form.component.html',
  styleUrl: './physicians-form.component.scss'
})
export class PhysicianFormComponent {
  model: any = { name: '', specialty: '', age: '', notes: '' };
  isEdit = false;
  constructor(private route: ActivatedRoute, private router: Router) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const p = getPhysician(id);
      if (p) { this.model = { ...p }; this.isEdit = true; }
    }
  }
  submit() {
    if (this.isEdit) {
      updatePhysician(this.model);
    } else {
      addPhysician({ name: this.model.name, specialty: this.model.specialty, age: this.model.age ? Number(this.model.age) : undefined, notes: this.model.notes });
    }
    this.router.navigate(['/users/physicians']);
  }
  goBack() { this.router.navigate(['/users/physicians']); }
}
