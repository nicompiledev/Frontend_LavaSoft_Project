import { Component } from '@angular/core';
import { Modal } from 'bootstrap';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-aceptar-lavaderos',
  templateUrl: './aceptar-lavaderos.component.html',
  styleUrls: ['./aceptar-lavaderos.component.scss']
})
export class AceptarLavaderosComponent {

  constructor( private modal: ModalReserveService){

  }

  closeModal(stateModal:boolean , focus:string){
    this.modal.estadomodal(stateModal , focus)
  }

}
