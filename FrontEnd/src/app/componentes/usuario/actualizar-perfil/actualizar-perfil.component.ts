import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.component.html',
  styleUrls: ['./actualizar-perfil.component.scss']
})
export class ActualizarPerfilComponent implements OnInit {

  usuario : any = {
    ngModel: NgModel
  }

  mensajeError: string;

  constructor(private route: ActivatedRoute,
    private service: UsuarioService){}

  ngOnInit() {
    this.service.getPerfil().subscribe(
      (usuario: any) => {
          this.usuario = usuario;
          console.log(usuario)
      },
      (error) => {
        console.error(error)
      }
    );
  }

  actualizarPerfil() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.actualizarPerfil(id, this.usuario).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        this.mensajeError = error.msg;
      }
    )
  }

}
