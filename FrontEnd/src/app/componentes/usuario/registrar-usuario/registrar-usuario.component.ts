import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuarios.service';
import { Usuario } from '../../../interfaces/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent {
  usuarioForm: FormGroup;
  mensajeError = '';

  constructor(private servicio: UsuarioService) { 
    this.usuarioForm = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'telefono': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
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

      try {
        const response = await this.servicio.registrarUsuario(usuario).toPromise();
        console.log(response);
      } catch (error) {
        // mensaje enviado del backend
        this.mensajeError = error.error.msg;
      }
    }
  }
}
