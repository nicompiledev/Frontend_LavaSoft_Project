import {Component, ViewChild} from '@angular/core';
import{ MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { LavaderoService } from 'src/app/services/lavadero.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';

import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-in-progress-table',
  templateUrl: './in-progress-table.component.html',
  styleUrls: ['./in-progress-table.component.scss']
})
export class InProgressTableComponent{
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['Nombre', 'Placa', 'Tipo', 'Encargado', 'Servicio', 'Acciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private lavaderoService: LavaderoService, private loader: LoaderService) {
    this.getData();
  }

  getData() {

    this.loader.showLoader();
    this.lavaderoService.getReservarProceso()
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
            Encargado: item.nombre_emplado,
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

  scrollPrevious() {
    const container = document.getElementById('container');
    container.scrollBy({ left: -80, behavior: 'smooth' });
  }
  scrollNext() {
    const container = document.getElementById('container');
    container.scrollBy({ left: 80, behavior: 'smooth' });
  }



  terminado(elemnt: any){

    this.loader.showLoader();
    this.lavaderoService.terminarReserva(elemnt.id_reserva, elemnt.id_usuario)
    .pipe(finalize(() => this.loader.hideLoader()))
    .subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Reserva terminada',
          text: response.message,
        });
        this.getData();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
      }
    );


  }
}
