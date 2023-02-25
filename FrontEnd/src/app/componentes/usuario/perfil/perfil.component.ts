import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuarios.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario: any;

  constructor(private service: UsuarioService,
              private router: Router) { }

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
    this.service.logout();
    this.router.navigate(['/']);
  }
}
