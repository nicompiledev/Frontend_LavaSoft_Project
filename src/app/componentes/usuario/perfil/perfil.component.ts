
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuarios.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  usuarioForm: FormGroup;

  active: boolean = false;

  usuario: any;

  constructor(private service: UsuarioService,
              private router: Router,
              public auth: AuthService,
              private modal: ModalReserveService,
              private loader: LoaderService,
              ) {
                this.modal.$modal_reserve.subscribe((valor) =>{
                  this.active = valor;
                  console.log("valor", valor)
                })

                this.usuarioForm = new FormGroup(
                  {
                    nombre: new FormControl('', [Validators.required]),
                    apellido: new FormControl('', [Validators.required]),
                    genero: new FormControl('', [Validators.required]),
                    fecha_nacimiento: new FormControl('', [Validators.required]),
                    correo_electronico: new FormControl('', [Validators.required, Validators.email]),
                    contrasena: new FormControl('', [
                      Validators.required,
                      Validators.minLength(8),
                    ]),
                    confimar_password: new FormControl('', [
                      Validators.required,
                      Validators.minLength(8),
                    ]),
                    telefono: new FormControl('', [
                      Validators.required,
                      Validators.minLength(10),
                      Validators.maxLength(10),
                    ]),
                  })
              }

  ngOnInit() {
    this.loader.showLoader();
    // modal service
    this.service.getPerfil()
    .pipe(
      finalize(() => {
        this.loader.hideLoader();
      })
    )
    .subscribe(
      (usuario: any) => {
        this.usuario = usuario;

        console.log("usuario", usuario);

        const fechaNacimiento = new Date('1990-01-01T00:00:00.000Z');
        const fechaNacimientoString = fechaNacimiento.toISOString().substring(0, 10);
        

        this.usuarioForm.patchValue({
          nombre: this.usuario.nombre,
          apellido: this.usuario.apellido,
          genero: this.usuario.genero,
          fecha_nacimiento: fechaNacimientoString,
          correo_electronico: this.usuario.correo_electronico,
          telefono: this.usuario.telefono,
          contrasena: this.usuario.contrasena
        });
      },
      (error) => {
        console.error(error); // manejar el error
      }
    );
  }

  openModal(statemodal:boolean , focus:string){
    this.modal.estadomodal(statemodal , focus)
  }
}






