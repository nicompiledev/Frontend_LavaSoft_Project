import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  usuarioForm: FormGroup;

  constructor(
    private servicio: UsuarioService,
    private router: Router,
    private modal_service: ModalReserveService,
    private loader: LoaderService
  ) {
    // CAMPOS : nombre, apellido, genero, fecha_nacimiento, correo_electronico, contrasena, telefono
    this.usuarioForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        genero: new FormControl('', [Validators.required]),
        fecha_nacimiento: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confimar_password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        cel: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      },
      { validators: this.validarContrasenasIguales }
    );
  }

  closeModal(stateModal: number, focus: string) {
    this.modal_service.estadomodal(stateModal, focus);
  }

  async finalizar() {
    if (this.usuarioForm.valid) {
      this.loader.showLoader();
      const usuario: object = {
        nombre: this.usuarioForm.get('name').value,
        apellido: this.usuarioForm.get('lastname').value,
        correo_electronico: this.usuarioForm.get('email').value,
        fecha_nacimiento: this.usuarioForm.get('fecha_nacimiento').value,
        genero: this.usuarioForm.get('genero').value,
        contrasena: this.usuarioForm.get('password').value,
        telefono: this.usuarioForm.get('cel').value,
      };

      this.servicio.registrarUsuario(usuario)
      .pipe(
        finalize(() => this.loader.hideLoader())
      )
      .subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Registro exitoso!',
            text: response.msg,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.modal_service.estadomodal(0, 'profile_carwash');
        },
        (error) => {
          console.log(error);
          Swal.fire({
            title: '¡Error!',
            text: error.error.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }
  marginLeft: string = '0%';
  elementos: { contenido: string; activo: boolean; texto: string }[] = [
    { contenido: '1', activo: true, texto: 'Datos.' },
    { contenido: '2', activo: false, texto: 'Nac.' },
    { contenido: '3', activo: false, texto: 'Contac.' },
    { contenido: '4', activo: false, texto: 'Pass.' },
  ];

  ngOnInit(): void {}

  validarContrasenasIguales(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confimar_password').value;
    return password === confirmPassword
      ? null
      : { contrasenasNoCoinciden: true };
  }

  camposPorPagina = [
    [], // No se requiere validación para avanzar a la primera página
    ['name', 'lastname'], // Campos a validar en la página 1
    ['fecha_nacimiento', 'genero'], // Campos a validar en la página 2
    ['email', 'cel'], // Campos a validar en la página 3
    ['password', 'confimar_password'], // Campos a validar en la página 4
  ];

  siguiente(lugar: string) {
    const paginaActual = parseInt(lugar) - 1;
    const camposAValidar = this.camposPorPagina[paginaActual];
    let camposValidos = true;
    this.usuarioForm.markAllAsTouched();

    for (let campo of camposAValidar) {
      if (!this.usuarioForm.get(campo).valid) {
        camposValidos = false;
        break;
      }
    }
    if (camposValidos) {
      // Quitar MarkAllAsTouched
      this.usuarioForm.markAsUntouched();
      for (let i = 0; i < this.elementos.length; i++) {
        if (this.elementos[i].contenido === lugar) {
          console.log(lugar);
          this.marginLeft = '-' + i * 25 + '%';
          this.elementos[i].activo = true;
          this.elementos[i - 1].contenido = '✓';
        }
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
