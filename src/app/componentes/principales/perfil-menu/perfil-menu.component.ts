import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/security/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-menu',
  templateUrl: './perfil-menu.component.html',
  styleUrls: ['./perfil-menu.component.scss']
})
export class PerfilMenuComponent {

  constructor(public auth: AuthService){}

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, cerrar sesión',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        this.auth.logout();
      }
    });
  }

}
