import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private modal_service : ModalReserveService, public loaderService: LoaderService) { }

  openModal(stateModal:number , focus:string){
    this.modal_service.estadomodal(stateModal, focus )
  }

  isActive(url: string) {
    return window.location.pathname === url;
  }
}
