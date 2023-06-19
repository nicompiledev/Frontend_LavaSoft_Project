
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCar,
  faGauge,
  faClipboardCheck,
  faFlag,
  faInbox,
  faArrowRightFromBracket,
  faBars,
  faHome,
  faReceipt,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/security/auth.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit{

  modal_employee: boolean = false;
  modal_cancel: boolean = false;

  isLoading: boolean = false;

  constructor(public router: Router, private auth: AuthService, public loader: LoaderService, private modalService: ModalReserveService) {
    this.modalService.$modal_employee.subscribe((modal_employee: any) => {
      this.modal_employee = modal_employee.estado;
    });
    this.modalService.$modal_cancel.subscribe((modal_cancel_reserve: any) => {
      this.modal_cancel = modal_cancel_reserve.estado;
    });
  }

  ngAfterViewInit() {
      this.loader.isLoading$.subscribe((isLoading: boolean) => {
        setTimeout(() => {
          this.isLoading = isLoading;
        });
      });
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
  membresia = faReceipt;
  perfilLavadero = faUserTie

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/inicio']);
  }

}

export class NavegacionComponent {

}
