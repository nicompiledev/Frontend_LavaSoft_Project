import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuarios.service';
import { Usuario } from '../../../interfaces/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent {
  usuarioForm: FormGroup;
  mensajeError = '';

  constructor(private servicio: UsuarioService, private router: Router) {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  async onSubmit() {
    if (this.usuarioForm.valid) {
      const usuario: Usuario = {
        nombre: this.usuarioForm.get('nombre').value,
        email: this.usuarioForm.get('email').value,
        telefono: this.usuarioForm.get('telefono').value,
        password: this.usuarioForm.get('password').value,
      };

      this.servicio.registrarUsuario(usuario).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/login'])
        },
        (error) => {
          console.log(error);
          this.mensajeError = error.error.msg;
        }
      );
    }
  }
}
