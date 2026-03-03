import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuditor } from './auditors-data';

@Component({
  selector: 'app-auditor-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auditors-detail.component.html',
  styleUrls: ['./auditors-detail.component.scss']
})
export class AuditorDetailComponent {
  auditor: any = null;
  constructor(private route: ActivatedRoute, public router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.auditor = getAuditor(id);
    if (!this.auditor) this.router.navigate(['/users/auditors']);
  }
}
