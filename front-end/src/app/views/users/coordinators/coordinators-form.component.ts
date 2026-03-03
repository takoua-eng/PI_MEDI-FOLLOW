import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { addCoordinator, getCoordinator, updateCoordinator } from './coordinators-data';

@Component({
  selector: 'app-coordinator-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coordinators-form.component.html',
  styles: [
    `.form-card { padding:1rem; background:white; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.04); }
     .mb-2 { margin-bottom:0.75rem; }`
  ]
})
export class CoordinatorFormComponent {
  model: any = { name: '', unit: '', notes: '' };
  isEdit = false;
  constructor(private route: ActivatedRoute, private router: Router) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const p = getCoordinator(id);
      if (p) { this.model = { ...p }; this.isEdit = true; }
    }
  }
  submit() {
    if (this.isEdit) { updateCoordinator(this.model); } else { addCoordinator({ name: this.model.name, unit: this.model.unit, notes: this.model.notes }); }
    this.router.navigate(['/users/coordinators']);
  }
  goBack() { this.router.navigate(['/users/coordinators']); }
}
