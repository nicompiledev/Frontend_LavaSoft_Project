import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCar,
  faGauge,
  faClipboardCheck,
  faFlag,
  faInbox,
  faArrowRightFromBracket,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss'],
})
export class NavegacionComponent {
  constructor(public router: Router, private auth: AuthService) {
  }

  ocultarMenu = false;
  seleccionado = 'dashboard';
  // fontawesome
  titulo = faCar;
  dashboard = faGauge;
  peticionEmpresa = faClipboardCheck;
  reportes = faFlag;
  chatAsesor = faInbox;
  salir = faArrowRightFromBracket;
  menu = faBars;

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/inicio']);
  }
}
