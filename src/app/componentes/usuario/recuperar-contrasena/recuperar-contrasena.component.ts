import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuarios.service';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent implements OnInit {
  form: FormGroup;
  enviado = false;


  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private loader: LoaderService, private modal_service: ModalReserveService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loader.showLoader();
      const email = this.form.get('email').value;
      this.usuarioService.enviarCorreo(email)
      .pipe(
        finalize(() => this.loader.hideLoader())
      )
      .subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Correo enviado',
            text: response.msg,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0096d2'
          });

          this.modal_service.estadomodal(0, 'profile_carwash');
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.msg,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0096d2'
          });
        }
      );
    }
  }
}
