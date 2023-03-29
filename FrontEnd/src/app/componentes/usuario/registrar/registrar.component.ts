import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent  implements OnInit{
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
      ])
    });
  }

  async onSubmit() {
    if (this.usuarioForm.valid) {
      const usuario: object = {
        nombre: this.usuarioForm.get('name').value,
        apellido: this.usuarioForm.get('lastname').value,
        correo_electronico: this.usuarioForm.get('email').value,
        contrasena: this.usuarioForm.get('password').value,
        telefono: this.usuarioForm.get('cel').value,
      };

      this.servicio.registrarUsuario(usuario).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate([''])
        },
        (error) => {
          console.log(error);
          this.mensajeError = error.error.msg;
        }
      );
    }
  }
  next: any;
  next2: any;
  next3: any;
  back: any;
  back2: any;
  back3: any;
  end: any;
  movPage: any;
  numeros: any;
  checks: any;
  linea: any;
  pages: number = 4;
  count: number = 1;

  

  ngOnInit(): void {
    this.next = document.querySelector('.siguiente-page2');
    this.next2 = document.querySelector('.siguiente-page3');
    this.next3 = document.querySelector('.siguiente-page4');

    this.back = document.querySelector('.volver-page1');
    this.back2 = document.querySelector('.volver-page2');
    this.back3 = document.querySelector('.volver-page3');
    this.end = document.querySelector('.fin');
    this.movPage = document.querySelector('.movPage');

    this.numeros = document.querySelectorAll('.steps p')
    this.checks = document.querySelectorAll('.steps .check')
    this.linea = document.querySelectorAll('.steps .number')

    this.next.addEventListener('click', (event: any) => {
        event.preventDefault();
        this.movPage.style.marginLeft = '-25%';
        this.linea[this.count - 1].classList.add('active');
        this.checks[this.count - 1].classList.add('active');
        this.count += 1;
    });
    this.next2.addEventListener('click', (event: any) => {
        event.preventDefault();
        this.movPage.style.marginLeft = '-50%';
        this.linea[this.count - 1].classList.add('active');
        this.checks[this.count - 1].classList.add('active');
        this.count += 1;
    });
    this.next3.addEventListener('click', (event: any) => {
        event.preventDefault();
        this.movPage.style.marginLeft = '-75%';
        this.linea[this.count - 1].classList.add('active');
        this.checks[this.count - 1].classList.add('active');
        this.count += 1;
    });
    this.back.addEventListener('click', (event: any) => {
        event.preventDefault();
        this.movPage.style.marginLeft = '0%';
        this.linea[this.count - 2].classList.remove('active');
        this.checks[this.count - 2].classList.remove('active');
        this.count -= 1;
        
    });
    this.back2.addEventListener('click', (event: any) => {
        event.preventDefault();
        this.movPage.style.marginLeft = '-25%';
        this.linea[this.count - 2].classList.remove('active');
        this.checks[this.count - 2].classList.remove('active');
        this.count -= 1;
        
    });
    this.back3.addEventListener('click', (event: any) => {
        event.preventDefault();
        this.movPage.style.marginLeft = '-50%';
        this.linea[this.count - 2].classList.remove('active');
        this.checks[this.count - 2].classList.remove('active');
        this.count -= 1;
        
    });
    this.end.addEventListener('click', (event: any) => {
        event.preventDefault();
        this.linea[this.count - 1].classList.add('active');
        this.checks[this.count - 1].classList.add('active');
        this.count += 1;
         alert("Esta aceptanto terminos")
        })

  }
}
