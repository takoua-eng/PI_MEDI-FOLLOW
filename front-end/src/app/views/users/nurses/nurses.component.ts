import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Nurse, getNurses, deleteNurse } from './nurses-data';
import { RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-nurses',
  standalone: true,
  imports: [CommonModule, FormsModule, RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, ButtonDirective, IconDirective],
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.scss'],
})
export class NursesComponent {
  searchTerm = '';
  items: Nurse[] = [];
  showMenuFor?: number;

  constructor(private router: Router) { this.refresh(); }
  refresh() { this.items = getNurses(); }
  get filtered() { const term = this.searchTerm.trim().toLowerCase(); if (!term) return this.items; return this.items.filter(p => p.name.toLowerCase().includes(term) || p.department.toLowerCase().includes(term)); }
  openMenu(ev: MouseEvent, id: number) { ev.stopPropagation(); this.showMenuFor = this.showMenuFor === id ? undefined : id; }
  goToDetail(p: Nurse) { this.router.navigate(['/users/nurses', p.id]); }
  goToEdit(p: Nurse) { this.router.navigate(['/users/nurses', p.id, 'edit']); }
  delete(p: Nurse) { if (!confirm(`Supprimer ${p.name} ?`)) return; deleteNurse(p.id); this.refresh(); this.showMenuFor = undefined; }
  addNew() { this.router.navigate(['/register']); }
}
