import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { getNurse } from './nurses-data';

@Component({
  selector: 'app-nurse-detail',
  imports: [CommonModule],
  templateUrl: './nurses-detail.component.html',
  styleUrl: './nurses-detail.component.scss'
})
export class NurseDetailComponent {
  nurse: any = null;
  constructor(private route: ActivatedRoute, public router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.nurse = getNurse(id);
    if (!this.nurse) this.router.navigate(['/users/nurses']);
  }
}
