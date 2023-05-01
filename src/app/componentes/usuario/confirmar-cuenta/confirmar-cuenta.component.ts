import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-confirmar-cuenta',
  templateUrl: './confirmar-cuenta.component.html',
  styleUrls: ['./confirmar-cuenta.component.scss']
})
export class ConfirmarCuentaComponent implements OnInit {
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
