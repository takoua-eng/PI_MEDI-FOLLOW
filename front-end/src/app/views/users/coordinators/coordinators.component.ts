import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Coordinator, getCoordinators, deleteCoordinator } from './coordinators-data';
import { RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-coordinators',
  standalone: true,
  imports: [CommonModule, FormsModule, RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, ButtonDirective, IconDirective],
  templateUrl: './coordinators.component.html',
  styleUrls: ['./coordinators.component.scss'],
})
export class CoordinatorsComponent {
  searchTerm = '';
  items: Coordinator[] = [];
  showMenuFor?: number;
  constructor(private router: Router) { this.refresh(); }
  refresh() { this.items = getCoordinators(); }
  get filtered() { const term = this.searchTerm.trim().toLowerCase(); if (!term) return this.items; return this.items.filter(p => p.name.toLowerCase().includes(term) || p.unit.toLowerCase().includes(term)); }
  openMenu(ev: MouseEvent, id: number) { ev.stopPropagation(); this.showMenuFor = this.showMenuFor === id ? undefined : id; }
  goToDetail(p: Coordinator) { this.router.navigate(['/users/coordinators', p.id]); }
  goToEdit(p: Coordinator) { this.router.navigate(['/users/coordinators', p.id, 'edit']); }
  delete(p: Coordinator) { if (!confirm(`Supprimer ${p.name} ?`)) return; deleteCoordinator(p.id); this.refresh(); this.showMenuFor = undefined; }
  addNew() { this.router.navigate(['/register']); }
}
