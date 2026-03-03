import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { getPhysician } from './physicians-data';

@Component({
  selector: 'app-physician-detail',
  imports: [CommonModule],
  templateUrl: './physicians-detail.component.html',
  styleUrl: './physicians-detail.component.scss'
})
export class PhysicianDetailComponent {
  physician: any = null;
  constructor(private route: ActivatedRoute, public router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.physician = getPhysician(id);
    if (!this.physician) this.router.navigate(['/users/physicians']);
  }
}
