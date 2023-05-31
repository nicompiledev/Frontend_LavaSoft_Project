import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-modal-vehicles',
  templateUrl: './modal-vehicles.component.html',
  styleUrls: ['./modal-vehicles.component.scss']
})
export class ModalVehiclesComponent {

  vehicleForm : FormGroup;

  constructor(
    private modal: ModalReserveService
  )
  {
    this.vehicleForm = new FormGroup ({
      placa: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      tipo_vehiculo: new FormControl('', [Validators.required])
    })
  }


  closeModal(stateModal:boolean , focus: string){
    this.modal.estadomodal(stateModal,focus)
  }
}