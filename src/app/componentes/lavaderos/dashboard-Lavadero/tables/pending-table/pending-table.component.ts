import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LavaderoService } from 'src/app/services/lavadero.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';

@Component({
  selector: 'app-pending-table',
  templateUrl: './pending-table.component.html',
  styleUrls: ['./pending-table.component.scss']
})
export class PendingTableComponent {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'Nombre',
    'Placa',
    'Tipo',
    'Hora',
    'Servicio',
    'Acciones',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  currentDate: Date = new Date();
  dates: Date[] = [];

  selectedDate: Date;

  reservaSeleccionada: any = {};

  constructor(private modalService:ModalReserveService, private lavaderoService: LavaderoService, private loader: LoaderService) {
    this.selectedDate = this.currentDate;

    modalService.$modal_employee.subscribe((estado: any) => {
      if(!estado.estado){
        this.getData(this.getCurrentDate());
      }
    });
  }


  openModal(btn:string, elemnt: any){
    if(btn === 'cancelar'){
      this.modalService.estadomodal(true , 'cancel_reserve', elemnt);
    }

    if(btn === 'confirmar'){
      this.modalService.estadomodal(true , 'add_employee', elemnt);
    }
  }


  ngOnInit() {
    this.fillDatesArray();
  }

  getData(fecha: string) {
    this.loader.showLoader();
    this.lavaderoService.getReservasNoAtendidas(fecha)
    .pipe(finalize(() => this.loader.hideLoader()))
    .subscribe(
      (response: any) => {;
        let objects: any[] = [];
        response.forEach((item: any) => {
          let object: any = {
            id_reserva: item._id,
            id_usuario: item.id_usuario,
            Servicio: item.nombre_servicio,
            Nombre: item.nombre_usuario,
            Placa: item.placa_vehiculo,
            Tipo: item.tipo_vehiculo,
            Fecha: item.fecha,
            Hora: item.hora_inicio + ' - ' + item.hora_fin,
          };
          objects.push(object);
        });
        this.dataSource.data = objects;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error al obtener las reservas',
        });
      }
    );
  }

  onDateChange(event: any) {
    this.getData(event.target.value);
  }

  fillDatesArray() {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 15);

    for (let i = 0; i < 15; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      this.dates.push(currentDate);
    }
  }

  scrollPrevious() {
    const container = document.getElementById('container');
    if (container) {
      container.scrollBy({ left: -80, behavior: 'smooth' });
    }
  }

  scrollNext() {
    const container = document.getElementById('container');
    if (container) {
      container.scrollBy({ left: 80, behavior: 'smooth' });
    }
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
