import { Component } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent {
constructor(private modalService: ModalReserveService){}


closeModal(){
  this.modalService.estadomodal(false , 'history')
}
}
