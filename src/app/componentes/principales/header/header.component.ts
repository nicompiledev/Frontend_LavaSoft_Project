import { Component } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private modal_service : ModalReserveService){}

  openModal(modal){
    this.modal_service.$modal_home.emit(modal)
    console.log(modal);
    
  }

  isActive(url: string) {
    return window.location.pathname === url;
  }
}
