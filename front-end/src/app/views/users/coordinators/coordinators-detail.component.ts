import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { getCoordinator } from './coordinators-data';

@Component({
  selector: 'app-coordinator-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coordinators-detail.component.html',
  styleUrls: ['./coordinators-detail.component.scss']
})
export class CoordinatorDetailComponent {
  coordinator: any = null;
  constructor(private route: ActivatedRoute, public router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.coordinator = getCoordinator(id);
    if (!this.coordinator) this.router.navigate(['/users/coordinators']);
  }
}
