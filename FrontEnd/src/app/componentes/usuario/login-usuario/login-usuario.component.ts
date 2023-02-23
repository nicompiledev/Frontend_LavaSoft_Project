import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss'],
})
export class LoginUsuarioComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg: string;

  constructor(private fb: FormBuilder, private service: UsuarioService) { }

  ngOnInit() {
  this.loginForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  onSubmit() {
  const email = this.loginForm.get('email').value;
  const password = this.loginForm.get('password').value;
  this.service.login(email, password).subscribe(response => {
  console.log(response); // Aquí puedes hacer lo que quieras con la respuesta del servidor
  }, error => {
  this.errorMsg = error.error.msg;
  });
  }
}

