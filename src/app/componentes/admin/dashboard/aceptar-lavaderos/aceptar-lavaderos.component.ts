import { Component } from '@angular/core';
import { Modal } from 'bootstrap';
import { PeticionLavaderoModalService } from 'src/app/services/comunicación/peticion-lavadero-modal.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-aceptar-lavaderos',
  templateUrl: './aceptar-lavaderos.component.html',
  styleUrls: ['./aceptar-lavaderos.component.scss']
})
export class AceptarLavaderosComponent {

  lavadero: any;

  constructor( private modal: ModalReserveService, private peticionLavadero: PeticionLavaderoModalService){
    this.peticionLavadero.$lavadero.subscribe( lavadero => {
      console.log(lavadero);
      
      this.lavadero = lavadero;
    })
  }

  closeModal(stateModal:boolean , focus:string){
    this.modal.estadomodal(stateModal , focus)
  }

}
