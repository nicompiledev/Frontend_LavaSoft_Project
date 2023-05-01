import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  usuarioForm: FormGroup;
  mensajeError = '';

  constructor(private servicio: UsuarioService, private router: Router) {
    this.usuarioForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      cel: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    });
  }

  async finalizar() {
    if (this.usuarioForm.valid) {
      const usuario: object = {
        nombre: this.usuarioForm.get('name').value,
        apellido: this.usuarioForm.get('lastname').value,
        correo_electronico: this.usuarioForm.get('email').value,
        contrasena: this.usuarioForm.get('password').value,
        telefono: this.usuarioForm.get('cel').value,
      };

      this.servicio.registrarUsuario(usuario,).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
          this.mensajeError = error.error.msg;
        }
      );
    }
  }
  marginLeft: string = '0%';
  elementos: { contenido: string; activo: boolean; texto: string }[] = [
    { contenido: '1', activo: true, texto: 'Datos.' },
    { contenido: '2', activo: false, texto: 'Nac.' },
    { contenido: '3', activo: false, texto: 'Contac.' },
    { contenido: '4', activo: false, texto: 'password' },
  ];

  ngOnInit(): void {}

  siguiente(lugar: string) {
    for (let i = 0; i < this.elementos.length; i++) {
      if (this.elementos[i].contenido === lugar) {
        console.log(lugar);
        this.marginLeft = '-' + i * 25 + '%';
        this.elementos[i].activo = true;
        this.elementos[i - 1].contenido = '✓';
      }
    }
  }

  anterior(lugar: string) {
    for (let i = 0; i < this.elementos.length; i++) {
      if (this.elementos[i].contenido === lugar) {
        this.marginLeft = '-' + (i - 1) * 25 + '%';
        this.elementos[i].activo = false;
        this.elementos[i - 1].contenido = i.toString();
      }
    }
  }
}
