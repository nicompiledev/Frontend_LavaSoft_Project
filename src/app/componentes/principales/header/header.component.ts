import { Component, HostListener } from '@angular/core';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { AuthService } from 'src/app/services/security/auth.service';

import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  
 //modal

 active:boolean;

 condicion = false

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    if (this.viewportScroller.getScrollPosition()[1] > 200) {
      document.querySelector('.go-top-container').classList.add('show');
    } else {
      document.querySelector('.go-top-container').classList.remove('show');
    }
  }

  subir(){
    // Subir navegador arriba solamente
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  activeModal: number = 0;

  Pago: boolean = false;
  Visualizado: boolean = false;

  constructor(
    private modal_service: ModalReserveService,
    public loaderService: LoaderService,
    public auth: AuthService,
    private viewportScroller: ViewportScroller
  ) {
    this.auth.hasPaid.subscribe((response: any) => {
      this.Pago = response;
    });
    this.auth.visualizado.subscribe((response: any) => {
      this.Visualizado = response;
    });


    this.modal_service.$modal_history.subscribe((valor) => {
      this.active = valor
    })
  }

  openModal(stateModal: number, focus: string) {
    this.modal_service.estadomodal(stateModal, focus);
  }

  isActive(url: string) {
    return window.location.pathname === url;
  }

  ngOnInit(): void {
    this.modal_service.$modal.subscribe((valor) => {
      this.activeModal = valor;
    });
  }
}
