import { Component } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-services-carwash',
  templateUrl: './services-carwash.component.html',
  styleUrls: ['./services-carwash.component.scss']
})
export class ServicesCarwashComponent {

  constructor(private modal_service: ModalReserveService){

  }

openModal(stateModal:boolean , focus: string){
 this.modal_service.estadomodal(stateModal ,focus)
}


}
