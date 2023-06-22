import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';

@Component({
  selector: 'app-modal-vehicles',
  templateUrl: './modal-vehicles.component.html',
  styleUrls: ['./modal-vehicles.component.scss']
})
export class ModalVehiclesComponent {

  @Input () tipoVehiculo: any;
  @Output() usuarioConVehiculoNuevo = new EventEmitter<any>();

  vehiculoForm : FormGroup;

  constructor(
    private modal: ModalReserveService,
    private usuarioService: UsuarioService,
    private loader: LoaderService
  )
  {
    this.vehiculoForm = new FormGroup ({
      placa: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      tipo_vehiculo: new FormControl('', [Validators.required]),
    })
  }

  agregarVehiculo() {

  if(this.tipoVehiculo) {
    this.vehiculoForm.controls['tipo_vehiculo'].setValue(this.tipoVehiculo);
  }

    if(this.vehiculoForm.valid){
      this.loader.showLoader();
    this.usuarioService.agregarVehiculo(this.vehiculoForm.value)
      .pipe(
        finalize(() => {
          this.loader.hideLoader();
        })
      )
      .subscribe(
        (response: any) => {
          this.usuarioConVehiculoNuevo.emit(response)
          this.closeModal(false , 'register_vehicle');
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  closeModal(stateModal:boolean , focus: string){
    this.modal.estadomodal(stateModal,focus)
  }
}