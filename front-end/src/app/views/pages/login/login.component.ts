import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    FormsModule,        // ✅ IMPORTANT
    HttpClientModule    // ✅ IMPORTANT
  ]
})
export class LoginComponent {

  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

onSubmit() {

  const data = {
    email: this.email,
    password: this.password
  };

  this.authService.login(data).subscribe(
    (response: any) => {

      localStorage.setItem("token", response.accessToken);

      console.log("Login success");

      // ✅ Redirection vers dashboard CoreUI
      this.router.navigate(['/dashboard']);

    },
    error => {
      console.log("Login failed");
    }
  );
}
}