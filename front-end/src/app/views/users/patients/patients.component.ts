import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient, getPatients, deletePatient as deletePatientData } from './patients-data';
import { RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, FormsModule, RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, ButtonDirective, IconDirective],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent {
  searchTerm = '';
  patients: Patient[] = [];
  showMenuFor?: number;
  selected?: Patient;

  constructor(private router: Router) {
    this.refresh();
  }

  refresh() {
    this.patients = getPatients();
  }

  get filtered() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.patients;
    return this.patients.filter(p =>
      p.name.toLowerCase().includes(term) || p.disease.toLowerCase().includes(term)
    );
  }

  openMenu(ev: MouseEvent, id: number) {
    ev.stopPropagation();
    this.showMenuFor = this.showMenuFor === id ? undefined : id;
  }

  goToDetail(p: Patient) {
    this.router.navigate(['/users/patients', p.id]);
  }

  goToEdit(p: Patient) {
    this.router.navigate(['/users/patients', p.id, 'edit']);
  }

  delete(p: Patient) {
    if (!confirm(`Supprimer ${p.name} ?`)) return;
    deletePatientData(p.id);
    this.refresh();
    this.showMenuFor = undefined;
  }

  addNew() {
    this.router.navigate(['/register']);
  }

  select(patient: Patient) {
    this.selected = patient;
  }
}
