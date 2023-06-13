import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuarios.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/security/auth.service';
import Swal from 'sweetalert2';
import { LavaderoService } from 'src/app/services/lavadero.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  viewComponent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: UsuarioService,
    private lavaderoServicio: LavaderoService,
    private modal_service: ModalReserveService,
    private loader: LoaderService,
    private auth: AuthService
  ) {}

  closeModal(stateModal: number, focus: string): void {
    this.modal_service.estadomodal(stateModal, focus);
  }

  Component(state: boolean) {
    if (state == false) {
      this.viewComponent = state;
    } else {
      this.viewComponent = state;
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      opcion: ['usuario', [Validators.required]],
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.valid) {
      this.loader.showLoader();
      if (this.loginForm.get('opcion').value == 'usuario') {
        this.loguearUsuario(email, password);
      }else{
        this.loguearLavadero(email, password)
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  loguearUsuario (email: string, password: string) {
    this.service
    .login(email, password)
    .pipe(
      finalize(() => {
        this.loader.hideLoader();
      })
    )
    .subscribe(
      (response: any) => {
        this.auth.login(response.token);
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          // cuando termine la animacion de chulo, cierre el modal
          timer: 1000,
          title: 'Bienvenido',
        });

        this.modal_service.estadomodal(0, 'profile_carwash');
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.msg,
        });
      }
    );
  }

  loguearLavadero(email: string, password: string){
    this.lavaderoServicio.loginLavadero(email, password).pipe(
      finalize(() => {
        this.loader.hideLoader();
      })
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        this.auth.login(response.token);
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
          title: 'Bienvenido',
        });

        this.modal_service.estadomodal(0, 'profile_carwash');
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.msg,
        });
      }
    );
  }
}
