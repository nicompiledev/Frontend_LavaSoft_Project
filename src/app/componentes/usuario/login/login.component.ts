import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuarios.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;
  viewComponent:boolean = false;

  constructor(private fb: FormBuilder, private service: UsuarioService, private router: Router ,private modal_service: ModalReserveService) {}

  closeModal(stateModal:number , focus:string) : void{
    this.modal_service.estadomodal(stateModal,focus)
  }

  Component(state:boolean){
    if(state == false){
      this.viewComponent = state;
    }
    else{
      this.viewComponent = state;
    }
  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.service.login(email, password).subscribe(
      (response : any) => {
        localStorage.setItem('token', response.token);
        console.log("response: " + response); // Aquí puedes hacer lo que quieras con la respuesta del servidor
        this.router.navigate(['/perfil'])
      },
      (error) => {
        this.errorMsg = error.error.msg;
      }
    );
  }
}
