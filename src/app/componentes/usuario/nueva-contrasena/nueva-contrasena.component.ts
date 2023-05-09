import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { UsuarioService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.component.html',
  styleUrls: ['./nueva-contrasena.component.scss'],
})
export class NuevaContrasenaComponent {

  usuarioForm: FormGroup;

  mensajeError = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.usuarioForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', [Validators.required, Validators.minLength(8)]],
    }, { validator: this.passwordMatchValidator });

  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const token = this.route.snapshot.paramMap.get('token');
      const password = this.usuarioForm.value.password;
      this.service.nuevoPassword(token, password).subscribe(
        (response) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          this.mensajeError = error.error.msg;
        }
      );
    }
  }

  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password').value;
    const confirmPass = control.get('confirmPass').value;
    return password === confirmPass ? null : { passwordMatch: true };
  }

}
