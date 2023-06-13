import { Component, OnInit } from '@angular/core';
import { InputService } from 'src/app/services/comunicación/input.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-services-carwash',
  templateUrl: './services-carwash.component.html',
  styleUrls: ['./services-carwash.component.scss'],
})
export class ServicesCarwashComponent implements OnInit {

  servicios: any[] = [];
  login = false;
  selectedVehicles: string[] = [];
  topPage:string = '0%'

  serviciosSeleccionados: any[] = [];

  constructor(
    private modal_service: ModalReserveService,
    private input: InputService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.input.$servicios.subscribe((servicios) => {
      this.servicios = servicios;
    });

    this.auth.isLogin.subscribe((login) => {
      this.login = login;
    });

  }

  openModal(stateModal: boolean, focus: string, servicio: any) {
    if(this.login){
    this.modal_service.estadomodal(stateModal, focus, servicio);
    }else{
      this.modal_service.estadomodal(1, "profile_carwash");
    }
  }

  abrirModal(){
    this.openModal(true, 'reserve', this.serviciosSeleccionados)
  }

  servicioSeleccionado($event: any, servicio: any){
    const checked = $event.target.checked;
    if (checked) {
      this.serviciosSeleccionados.push(servicio);
    } else {
      const index = this.serviciosSeleccionados.indexOf(servicio);
      if (index > -1) {
        this.serviciosSeleccionados.splice(index, 1);
      }
    }
  }

    // Seleccionar vehiculos
    onCheckboxChange(event: any, vehicle: string) {
      const checked = event.target.checked;
      if (checked) {
        this.selectedVehicles.push(vehicle);
      } else {
        const index = this.selectedVehicles.indexOf(vehicle);
        if (index > -1) {
          this.selectedVehicles.splice(index, 1);
        }
      }
    }

  
    
}
