import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faGauge,
  faClipboardCheck,
  faFlag,
  faInbox,
  faArrowRightFromBracket,
  faBars,
  faHome,
  faUserShield
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/security/auth.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss'],
})
export class NavegacionComponent {

  active = false;

  constructor(public router: Router, private auth: AuthService, private modal: ModalReserveService, public loader: LoaderService) {
    this.modal.$modal_reserve.subscribe((valor)=>{
      this.active = valor
    })
  }

  ocultarMenu = false;
  seleccionado = 'dashboard';
  // fontawesome
  titulo = faUserShield;
  dashboard = faGauge;
  peticionEmpresa = faClipboardCheck;
  reportes = faFlag;
  chatAsesor = faInbox;
  salir = faArrowRightFromBracket;
  menu = faBars;
  inicio = faHome;

  cerrarSesion() {
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
        this.router.navigate(['/inicio']);
      }
    });
  }
}
