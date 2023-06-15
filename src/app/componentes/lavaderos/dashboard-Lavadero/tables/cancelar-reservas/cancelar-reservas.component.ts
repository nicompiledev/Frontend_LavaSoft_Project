import { Component } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
@Component({
  selector: 'app-cancelar-reservas',
  templateUrl: './cancelar-reservas.component.html',
  styleUrls: ['./cancelar-reservas.component.scss']
})
export class CancelarReservasComponent {

  constructor(private modalSerrvice: ModalReserveService){}
  
  
  closeModal(){

    this.modalSerrvice.estadomodal( false , 'cancel_reserve')
  }
}
