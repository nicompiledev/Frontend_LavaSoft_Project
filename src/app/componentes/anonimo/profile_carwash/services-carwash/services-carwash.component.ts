import { Component, OnInit } from '@angular/core';
import { InputService } from 'src/app/services/comunicación/input.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services-carwash',
  templateUrl: './services-carwash.component.html',
  styleUrls: ['./services-carwash.component.scss'],
})
export class ServicesCarwashComponent implements OnInit {

  servicios: any[] = [];
  serviciosMostrados: any[] = [];
  login = false;
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
      this.onCheckboxChange('Carro');
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
    if(this.serviciosSeleccionados.length === 0){
      Swal.fire({
        title: 'Seleccione un servicio',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0096d2',
      });
      return;
    }
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
    onCheckboxChange(vehicle: string) {
      this.serviciosMostrados = this.servicios.filter(
        (servicio) => servicio.tipoVehiculo === vehicle
      );
      this.serviciosSeleccionados = [];
    }
}
