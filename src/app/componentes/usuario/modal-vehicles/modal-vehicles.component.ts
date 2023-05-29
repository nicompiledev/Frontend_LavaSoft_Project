import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-vehicles',
  templateUrl: './modal-vehicles.component.html',
  styleUrls: ['./modal-vehicles.component.scss']
})
export class ModalVehiclesComponent {

  vehicleForm : FormGroup;

  constructor()
  {
    this.vehicleForm = new FormGroup ({
      placa: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      tipo_vehiculo: new FormControl('', [Validators.required])
    })
  }
}