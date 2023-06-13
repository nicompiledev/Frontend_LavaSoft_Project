import { Component } from '@angular/core';
import { Modal } from 'bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { PeticionLavaderoModalService } from 'src/app/services/comunicación/peticion-lavadero-modal.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aceptar-lavaderos',
  templateUrl: './aceptar-lavaderos.component.html',
  styleUrls: ['./aceptar-lavaderos.component.scss']
})
export class AceptarLavaderosComponent {

  lavadero: any;

  constructor( private modal: ModalReserveService, private peticionLavadero: PeticionLavaderoModalService, private adminService: AdminService){
    this.peticionLavadero.$lavadero.subscribe( lavadero => {
      this.lavadero = lavadero;
    })
  }

  closeModal(stateModal:boolean , focus:string){
    this.modal.estadomodal(stateModal , focus)
  }

  aceptarLavadero(){
    this.adminService.activarLavadero(this.lavadero._id)
    .subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'Lavadero activado',
        text: 'El lavadero ha sido activado exitosamente',
        confirmButtonText: 'Aceptar'
      })
      this.closeModal(false , 'acceptance')
    }
    , err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.msg,
        confirmButtonText: 'Aceptar'
      })
    })
  }

}
