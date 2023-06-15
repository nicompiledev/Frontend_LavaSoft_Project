import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { UsuarioService } from '../../../services/usuarios.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.component.html',
  styleUrls: ['./nueva-contrasena.component.scss'],
})
export class NuevaContrasenaComponent {

  usuarioForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private service: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    public loader: LoaderService
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
        (response: any) => {
          // Swal si le da okay lo redireccione
          Swal.fire({
            title: 'Contraseña actualizada',
            text: response.msg,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0096d2'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/inicio']);
            }
          }
          );
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
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
