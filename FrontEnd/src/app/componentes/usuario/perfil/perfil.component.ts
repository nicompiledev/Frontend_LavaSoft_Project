import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuarios.service';
import { AuthService } from 'src/app/services/security/auth.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario: any;

  constructor(private service: UsuarioService,
              private router: Router,
              public auth: AuthService) { }

  ngOnInit() {
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
}
