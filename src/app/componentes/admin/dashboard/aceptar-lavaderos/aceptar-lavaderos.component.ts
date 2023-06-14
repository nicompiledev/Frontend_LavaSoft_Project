import { Component } from '@angular/core';
import { Modal } from 'bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { LavaderosNoActivosService } from 'src/app/services/admin/lavaderosNoActivos/lavaderosNoActivos';
import { PeticionLavaderoModalService } from 'src/app/services/comunicación/peticion-lavadero-modal.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';

@Component({
  selector: 'app-aceptar-lavaderos',
  templateUrl: './aceptar-lavaderos.component.html',
  styleUrls: ['./aceptar-lavaderos.component.scss']
})
export class AceptarLavaderosComponent {

  lavadero: any;

  constructor( private modal: ModalReserveService, private peticionLavadero: PeticionLavaderoModalService, private adminService: AdminService, private lodader: LoaderService, private pendientes: LavaderosNoActivosService){
    this.peticionLavadero.$lavadero.subscribe( lavadero => {
      this.lavadero = lavadero;
    })
  }

  closeModal(stateModal:boolean , focus:string){
    this.modal.estadomodal(stateModal , focus)
  }

  aceptarLavadero(){

    this.lodader.showLoader()

    this.adminService.activarLavadero(this.lavadero._id)
    .pipe(
      finalize( () => {
          this.lodader.hideLoader()
      })
    )
    .subscribe( (resp: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Lavadero activado',
        text: resp.msg,
        confirmButtonText: 'Aceptar'
      })
      this.closeModal(false , 'acceptance')
      this.pendientes.lavaderosNoActivos();
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
