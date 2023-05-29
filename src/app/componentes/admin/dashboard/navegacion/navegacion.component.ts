import { Component } from '@angular/core';
import { faCar, faGauge, faClipboardCheck, faFlag, faGear, faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent {
  ocultarMenu = false;
  seleccionado = 'dashboard'
  // fontawesome
  titulo = faCar;
  dashboard = faGauge;
  peticionEmpresa = faClipboardCheck;
  reportes = faFlag;
  configuracion = faGear;
  salir = faArrowRightFromBracket;
  menu = faBars;
  // fontawesome
}
