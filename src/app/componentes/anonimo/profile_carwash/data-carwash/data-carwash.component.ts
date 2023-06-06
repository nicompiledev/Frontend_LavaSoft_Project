import { Component } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service'; 
import { InputService } from 'src/app/services/comunicación/input.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-data-carwash',
  templateUrl: './data-carwash.component.html',
  styleUrls: ['./data-carwash.component.scss']
})
export class DataCarwashComponent {
  active: boolean = false;
  
  nombreLavadero: string;
  ciudad: string;
  direccion: string;
  hora_apertura: string;
  hora_cierre: string;
  tipoVehiculos: string[] = []

  constructor(private modal: ModalReserveService, private input: InputService, public auth: AuthService){

    this.modal.$modal_report.subscribe((valor)=>{
      this.active = valor
    })
    
      this.input.$informacion.subscribe((res: any) => {
      this.nombreLavadero = res.nombreLavadero;
      this.ciudad = res.ciudad;
      this.direccion = res.direccion;
      this.hora_apertura = res.hora_apertura;
      this.hora_cierre = res.hora_cierre;
      this.tipoVehiculos = res.tipoVehiculos;
      })
  }

  openModal(stateModal:boolean   , focus: string){
    this.modal.estadomodal(stateModal , focus)
  }

}
