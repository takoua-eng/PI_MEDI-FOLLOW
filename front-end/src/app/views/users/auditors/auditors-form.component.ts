import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { addAuditor, getAuditor, updateAuditor } from './auditors-data';

@Component({
  selector: 'app-auditor-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auditors-form.component.html',
  styleUrls: ['./auditors-form.component.scss']
})
export class AuditorFormComponent {
  model: any = { name: '', department: '', notes: '' };
  isEdit = false;
  constructor(private route: ActivatedRoute, private router: Router) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const p = getAuditor(id);
      if (p) { this.model = { ...p }; this.isEdit = true; }
    }
  }
  submit() {
    if (this.isEdit) { updateAuditor(this.model); } else { addAuditor({ name: this.model.name, department: this.model.department, notes: this.model.notes }); }
    this.router.navigate(['/users/auditors']);
  }
  goBack() { this.router.navigate(['/users/auditors']); }
}
