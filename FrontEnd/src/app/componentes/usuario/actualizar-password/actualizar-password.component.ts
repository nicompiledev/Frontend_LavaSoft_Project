import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-actualizar-password',
  templateUrl: './actualizar-password.component.html',
  styleUrls: ['./actualizar-password.component.scss']
})
export class ActualizarPasswordComponent {

  pwd_actual: string;
  pwd_nuevo: string;

  constructor(private service: UsuarioService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.actualizarPassword(this.pwd_actual, this.pwd_nuevo)
      .subscribe(
        data => {
          console.log(data);
          // Mostrar mensaje de éxito
        },
        error => {
          console.log(error.error.msg);
          // Mostrar mensaje de error
        }
      );
  }

}
