import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-nueva-contrasena-usuario',
  templateUrl: './nueva-contrasena-usuario.component.html',
  styleUrls: ['./nueva-contrasena-usuario.component.scss'],
})
export class NuevaContrasenaUsuarioComponent implements OnInit {
  form: FormGroup;
  token: string;
  mostrarInput = false;
  mensajeError: string;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.token = params.get('token');
      this.comprobarToken();
    });

    this.form = this.fb.group(
      {
        password: ['', Validators.required],
        confirmarPassword: ['', Validators.required],
      },
      { validator: this.checkPasswords }
    );
  }

  comprobarToken() {
    this.usuarioService.comprobarToken(this.token).subscribe(
      (response) => {
        this.mostrarInput = true;
      },
      (error) => {
        console.error(error);
        this.mensajeError = error.msg;
      }
    );
  }

  nuevoPassword() {
    const password = this.form.get('password').value;
    this.usuarioService.nuevoPassword(this.token, password).subscribe(
      (response) => {
        console.log(response);
        // redirigir al usuario a la página de inicio de sesión
      },
      (error) => {
        this.mensajeError = error.msg; // mostrar mensaje de error al usuario
      }
    );
  }

  checkPasswords(group: FormGroup) {
    // funcion para validar que los campos de password coincidan
    const password = group.get('password').value;
    const confirmarPassword = group.get('confirmarPassword').value;
    return password === confirmarPassword ? null : { notSame: true };
  }

}
