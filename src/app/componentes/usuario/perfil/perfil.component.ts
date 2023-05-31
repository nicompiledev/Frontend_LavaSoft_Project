
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuarios.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { log } from 'console';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  usuarioForm: FormGroup;

 active: boolean ;

  usuario: any;

  constructor(private service: UsuarioService,
              private router: Router,
              public auth: AuthService,
              private modal: ModalReserveService) { 
                this.modal.$modal_reserve.subscribe((valor) =>{
                  console.log(valor)

                  this.active = valor;
                  console.log(this.active)
                })

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
                  })
              }

  ngOnInit() {

    // modal service

   


    this.service.getPerfil().subscribe(
      (usuario: any) => {
        console.log(usuario)
          this.usuario = usuario;
      },
      (error) => {
        console.error(error); // manejar el error
      }
    );
  }


  

  cerrarSesion(){
    this.auth.logout()
    this.router.navigate(['/']);
  }
  openModal(statemodal:boolean , focus:string){
    this.modal.estadomodal(statemodal , focus)
  }
}






