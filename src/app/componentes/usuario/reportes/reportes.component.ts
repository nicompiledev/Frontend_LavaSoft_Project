import { Component } from '@angular/core';
import { log } from 'console';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  constructor(private modal:ModalReserveService ){}
  closeModal(stateModal:boolean , focus:string){
    this.modal.estadomodal(stateModal , focus);

  }
}
