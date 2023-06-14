
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LavaderoService } from 'src/app/services/lavadero.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
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
  
   // modal
   active:boolean;

  constructor(private modalService:ModalReserveService, private lavaderoService: LavaderoService){
    this.selectedDate = this.currentDate;
    this.modalService.$modal_cancel.subscribe((valor)=>{
      this.active = valor;
    })
  }


  openModal(){
    this.modalService.estadomodal(true , 'cancel_reserve')
  }

  selectDate(date: Date) {
    this.selectedDate = date;
  }

  ngOnInit() {
    this.fillDatesArray();

    let fecha = this.selectedDate.toISOString().slice(0, 10);
    this.getData(fecha);
  }

  getData(fecha: string) {
    this.lavaderoService.getReservasNoAtendidas(fecha)
    .subscribe(
      (response: any) => {
        console.log(response);
        let objects: any[] = [];
        response.forEach((item: any) => {
          let object: any = {
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
        console.error(error);
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
