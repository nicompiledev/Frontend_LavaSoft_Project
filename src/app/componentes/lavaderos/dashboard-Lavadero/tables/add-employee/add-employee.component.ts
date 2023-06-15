import { Component } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { LavaderoService } from 'src/app/services/lavadero.service';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {

  nombreEmpleado: string = '';
  servicio: any = {};

  constructor(private modalService:ModalReserveService, private lavaderoService: LavaderoService, private loader: LoaderService) {

    modalService.$modal_employee.subscribe((modal_employee: any) => {
      if(modal_employee){
        this.servicio = modal_employee.servicio;
      }
    });
  }

  closeModal(){
	this.modalService.estadomodal(false , 'add_employee', null);
  }

  confimarReserva(){
    if(this.nombreEmpleado === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes ingresar el nombre del empleado',
      })
      return;
    }

    this.loader.showLoader();
    this.lavaderoService.confirmarReserva(this.servicio.id_reserva, this.servicio.id_usuario, this.servicio.Servicio, this.nombreEmpleado)
    .pipe(finalize(() => this.loader.hideLoader()))
    .subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Reserva confirmada',
          showConfirmButton: false,
          timer: 1500
        })
        this.closeModal();
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error',
        })
      }
    )
  }
}