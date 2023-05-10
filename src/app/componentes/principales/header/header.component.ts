import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  activeModal: number = 0;

  constructor(private modal_service : ModalReserveService, public loaderService: LoaderService, public auth: AuthService) { }

  openModal(stateModal:number , focus:string){
    this.modal_service.estadomodal(stateModal, focus )
  }

  isActive(url: string) {
    return window.location.pathname === url;
  }

  ngOnInit(): void {
    this.modal_service.$modal.subscribe(valor => {
      this.activeModal = valor
    })
  }

  logout(): void {
    this.auth.logout();
  }
}
