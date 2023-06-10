import { Component } from '@angular/core';
import { BlobOptions } from 'buffer';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
@Component({
  selector: 'app-register-reserve',
  templateUrl: './register-reserve.component.html',
  styleUrls: ['./register-reserve.component.scss']
})
export class RegisterReserveComponent {


  constructor(private modal:ModalReserveService ){

  }

// modal

closeModal(stateModal: Boolean , focus: string){
  this.modal.estadomodal(stateModal, focus);
}

  validarInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input instanceof HTMLInputElement) {
      input.value = input.value.replace(/\D/g, '');
    }
  }

}
