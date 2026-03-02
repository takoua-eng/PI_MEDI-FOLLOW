import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';

import intlTelInput from 'intl-tel-input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    CommonModule,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective
  ]
})
export class RegisterComponent implements AfterViewInit {

  @ViewChild('phoneInput') phoneInput!: ElementRef;

  iti: any;
  phoneError: boolean = false;
ngAfterViewInit(): void {
  this.iti = intlTelInput(this.phoneInput.nativeElement, {
    initialCountry: 'tn',
    preferredCountries: ['tn', 'fr', 'us'],
    separateDialCode: true,
    autoPlaceholder: 'polite',
    utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js'
  } as any);
}

  validatePhone() {
    if (this.iti.isValidNumber()) {
      this.phoneError = false;

      const fullNumber = this.iti.getNumber();
      console.log('Valid number:', fullNumber); // format +216xxxxxxxx

    } else {
      this.phoneError = true;
    }
  }
}