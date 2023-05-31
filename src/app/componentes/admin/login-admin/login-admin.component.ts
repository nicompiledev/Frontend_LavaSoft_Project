import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent {
  loginForm: FormGroup;
  mensajeError: string = '';

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private auth: AuthService,
    public loader: LoaderService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo_electronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  onSubmit() {
    const correo_electronico = this.loginForm.get('correo_electronico').value;
    const contrasena = this.loginForm.get('contrasena').value;

    if (this.loginForm.valid) {

      this.loader.showLoader();

      this.adminService.loginAdmin(correo_electronico, contrasena)
      .pipe(
        finalize(() => this.loader.hideLoader())
      )
      .subscribe(
        (response: any) => {
          this.auth.login(response.token, response.rol);
          this.router.navigate(['/dashboard-admin']);
        },
        (error) => {
          console.log(error);
          this.mensajeError = error.error.msg;
        }
      );
    }
  }

  // Letras que suben en input:
  focusEmail = false;
  focusPassword = false;

  focusFunc(event, inputType: string) {
    if (inputType === 'email') {
      this.focusEmail = true;
    } else if (inputType === 'password') {
      this.focusPassword = true;
    }
  }

  blurFunc(event, inputType: string) {
    if (event.target.value === '') {
      if (inputType === 'email') {
        this.focusEmail = false;
      } else if (inputType === 'password') {
        this.focusPassword = false;
      }
    }
  }
}
