import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Physician, getPhysicians, deletePhysician } from './physicians-data';
import { RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-physicians',
  standalone: true,
  imports: [CommonModule, FormsModule, RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, ButtonDirective, IconDirective],
  templateUrl: './physicians.component.html',
  styleUrls: ['./physicians.component.scss'],
})
export class PhysiciansComponent {
  searchTerm = '';
  items: Physician[] = [];
  showMenuFor?: number;

  constructor(private router: Router) { this.refresh(); }

  refresh() { this.items = getPhysicians(); }

  get filtered() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.items;
    return this.items.filter(p => p.name.toLowerCase().includes(term) || p.specialty.toLowerCase().includes(term));
  }

  openMenu(ev: MouseEvent, id: number) { ev.stopPropagation(); this.showMenuFor = this.showMenuFor === id ? undefined : id; }
  goToDetail(p: Physician) { this.router.navigate(['/users/physicians', p.id]); }
  goToEdit(p: Physician) { this.router.navigate(['/users/physicians', p.id, 'edit']); }
  delete(p: Physician) { if (!confirm(`Supprimer ${p.name} ?`)) return; deletePhysician(p.id); this.refresh(); this.showMenuFor = undefined; }
  addNew() { this.router.navigate(['/register']); }
}
