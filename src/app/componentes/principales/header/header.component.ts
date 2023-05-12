import { Component, HostListener } from '@angular/core';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    if (document.documentElement.scrollTop > 400) {
      document.querySelector('.go-top-container').classList.add('show');
    } else {
      document.querySelector('.go-top-container').classList.remove('show');
    }
  }

  subir(){
    window.scrollTo(0,0);
  }

  activeModal: number = 0;

  constructor(
    private modal_service: ModalReserveService,
    public loaderService: LoaderService,
    public auth: AuthService
  ) {}

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

  logout(): void {
    this.auth.logout();
  }
}
