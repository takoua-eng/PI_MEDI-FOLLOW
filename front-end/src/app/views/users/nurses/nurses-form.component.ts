import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { addNurse, getNurse, updateNurse } from './nurses-data';

@Component({
  selector: 'app-nurse-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './nurses-form.component.html',
  styleUrl: './nurses-form.component.scss'
})
export class NurseFormComponent {
  model: any = { name: '', department: '', age: '', notes: '' };
  isEdit = false;
  constructor(private route: ActivatedRoute, private router: Router) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const p = getNurse(id);
      if (p) { this.model = { ...p }; this.isEdit = true; }
    }
  }
  submit() {
    if (this.isEdit) { updateNurse(this.model); } else { addNurse({ name: this.model.name, department: this.model.department, age: this.model.age ? Number(this.model.age) : undefined, notes: this.model.notes }); }
    this.router.navigate(['/users/nurses']);
  }
  goBack() { this.router.navigate(['/users/nurses']); }
}
