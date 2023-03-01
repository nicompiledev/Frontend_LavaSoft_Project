import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuarios.service';
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
      apellido: new FormControl('', [Validators.required]),
      correo_electronico: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ])
    });
  }

  async onSubmit() {
    if (this.usuarioForm.valid) {
      const usuario: object = {
        nombre: this.usuarioForm.get('nombre').value,
        apellido: this.usuarioForm.get('apellido').value,
        correo_electronico: this.usuarioForm.get('correo_electronico').value,
        contrasena: this.usuarioForm.get('contrasena').value,
        telefono: this.usuarioForm.get('telefono').value,
      };

      this.servicio.registrarUsuario(usuario).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate([''])
        },
        (error) => {
          console.log(error);
          this.mensajeError = error.error.msg;
        }
      );
    }
  }
}
