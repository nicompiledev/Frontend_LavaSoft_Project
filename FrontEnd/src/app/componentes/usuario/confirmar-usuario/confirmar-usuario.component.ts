import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-confirmar-usuario',
  templateUrl: './confirmar-usuario.component.html',
  styleUrls: ['./confirmar-usuario.component.scss']
})
export class ConfirmarUsuarioComponent implements OnInit {
  mensajeConfirmacion: string;
  mensajeError: string;
  confirmacionExitosa: boolean = false;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    const token = this.route.snapshot.params['token'];

    this.usuarioService.confirmarUsuario(token).subscribe(
      (response: any) => {
        this.mensajeConfirmacion = response.msg;
        this.confirmacionExitosa = true;
      },
      (error: any) => {
        this.mensajeError = error.error.msg;
        console.log(error);
      }
    );
  }
}
