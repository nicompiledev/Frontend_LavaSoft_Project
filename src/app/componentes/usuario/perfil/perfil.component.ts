
import { Component, OnInit, ViewChild } from '@angular/core';
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
      (res: any) => {
        console.log(res);
        
        this.usuario = res;
        this.cambiarInformaciónFormulario();
      },
      (error) => {
        console.error(error); // manejar el error
      }
    );
  }

  @ViewChild('collapseOne') collapseOne: any;

  cambiarInformaciónFormulario(){
    this.collapseOne.nativeElement.classList.remove('show');
        const fechaNacimiento = new Date(this.usuario.fecha_nacimiento);
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

        // subir ventana
        window.scrollTo(0, 0);
  }


  actualizar_Perfil() {

    this.loader.showLoader();

    this.service.actualizarPerfil(this.usuarioForm.value)
    .pipe(
      finalize(() => {
        this.loader.hideLoader();
      })
    )
    .subscribe(
      (res: any) => {
        this.usuario = res.usuario;
        this.cambiarInformaciónFormulario();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openModal(statemodal:boolean , focus:string){
    this.modal.estadomodal(statemodal , focus)
  }
}






