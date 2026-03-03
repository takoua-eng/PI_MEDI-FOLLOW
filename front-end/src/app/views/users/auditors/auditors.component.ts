import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auditor, getAuditors, deleteAuditor } from './auditors-data';
import { RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-auditors',
  standalone: true,
  imports: [CommonModule, FormsModule, RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, ButtonDirective, IconDirective],
  templateUrl: './auditors.component.html',
  styleUrls: ['./auditors.component.scss'],
})
export class AuditorsComponent {
  searchTerm = '';
  items: Auditor[] = [];
  showMenuFor?: number;
  constructor(private router: Router) { this.refresh(); }
  refresh() { this.items = getAuditors(); }
  get filtered() { const term = this.searchTerm.trim().toLowerCase(); if (!term) return this.items; return this.items.filter(p => p.name.toLowerCase().includes(term) || p.department.toLowerCase().includes(term)); }
  openMenu(ev: MouseEvent, id: number) { ev.stopPropagation(); this.showMenuFor = this.showMenuFor === id ? undefined : id; }
  goToDetail(p: Auditor) { this.router.navigate(['/users/auditors', p.id]); }
  goToEdit(p: Auditor) { this.router.navigate(['/users/auditors', p.id, 'edit']); }
  delete(p: Auditor) { if (!confirm(`Supprimer ${p.name} ?`)) return; deleteAuditor(p.id); this.refresh(); this.showMenuFor = undefined; }
  addNew() { this.router.navigate(['/register']); }
}
