
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
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/security/auth.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public router: Router, private auth: AuthService, public loader: LoaderService) {
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
  inicio = faHome;

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/inicio']);
  }

}

export class NavegacionComponent {

}
