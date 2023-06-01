
import { Component, OnInit, ViewChild } from '@angular/core';
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
  contrasenaForm: FormGroup;

  active: boolean = false;

  usuario: any;

  errorContrasena: string = '';
  errorPerfil: string = '';

  constructor(private service: UsuarioService,
              public auth: AuthService,
              private modal: ModalReserveService,
              private loader: LoaderService,
              ) {
                this.modal.$modal_reserve.subscribe((valor) =>{
                  this.active = valor;
                })

                this.usuarioForm = new FormGroup(
                  {
                    nombre: new FormControl('', [Validators.required]),
                    apellido: new FormControl('', [Validators.required]),
                    genero: new FormControl('', [Validators.required]),
                    fecha_nacimiento: new FormControl('', [Validators.required]),
                    correo_electronico: new FormControl('', [Validators.required, Validators.email]),
                    telefono: new FormControl('', [
                      Validators.required,
                      Validators.minLength(10),
                      Validators.maxLength(10),
                    ]),
                  })

                  this.contrasenaForm = new FormGroup(
                    {
                      contrasena: new FormControl('', [
                        Validators.required,
                      ]),
                      nueva_contrasena: new FormControl('', [
                        Validators.required,
                        Validators.minLength(8),
                      ]),
                      confirmar_contrasena: new FormControl('', [
                        Validators.required,
                        Validators.minLength(8),
                      ]),
                    }
                  )
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
        console.log(usuario);
        
        this.usuario = usuario;
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
    if(this.usuarioForm.valid){

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
          this.errorPerfil = error.error.msg;
        }
      );
    }
  }

  cambiarContrasena(){
    if(this.contrasenaForm.valid){
      this.loader.showLoader();
      this.service.actualizarContrasena(this.contrasenaForm.get('contrasena').value, this.contrasenaForm.get('nueva_contrasena').value)
      .pipe(
        finalize(() => {
          this.loader.hideLoader();
        })
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          
        },
        (error) => {
          this.errorContrasena =  error.error.msg;
        }
      );
    }
  }

  // VEHICULO
  //////////////
  recibeActualizarVehiculoAgregado(nuevoVehiculo: any){  
    this.usuario = nuevoVehiculo;
  }

  eliminarVehiculo(id_vehiculo: string){
    this.loader.showLoader();

    this.service.eliminarVehiculo(id_vehiculo)
    .pipe(
      finalize(() => {
        this.loader.hideLoader();
      })
    )
    .subscribe(
      (res: any) => {
        this.usuario = res.usuario;
      },
      (error) => {
        console.error(error);
      }
    );
    
  }
/////////////////

  openModal(statemodal:boolean , focus:string){
    this.modal.estadomodal(statemodal , focus)
  }
}






