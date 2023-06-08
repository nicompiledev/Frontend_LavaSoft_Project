import { Component, ViewChild} from '@angular/core';
import{ MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';


export interface UserTable{
  nombre: string;
  id: number;
  direccion: string;
  telefono: string;
}

const ELEMENT_DATA: UserTable[] = [
  {id: 1, nombre: 'Juan Pérez', direccion: 'Calle 123', telefono: '555-1234'},
  {id: 2, nombre: 'María González', direccion: 'Avenida 456', telefono: '555-5678'},
  {id: 3, nombre: 'Carlos Rodríguez', direccion: 'Calle 789', telefono: '555-9012'},
  {id: 4, nombre: 'Ana García', direccion: 'Avenida 345', telefono: '555-3456'},
  {id: 5, nombre: 'Pedro Martínez', direccion: 'Calle 678', telefono: '555-7890'},
  {id: 6, nombre: 'Lucía Hernández', direccion: 'Avenida 901', telefono: '555-2345'},
  {id: 7, nombre: 'Javier Gutiérrez', direccion: 'Calle 234', telefono: '555-6789'},
  {id: 8, nombre: 'Sara Sánchez', direccion: 'Avenida 567', telefono: '555-0123'},
  {id: 9, nombre: 'David López', direccion: 'Calle 890', telefono: '555-4567'},
  {id: 10, nombre: 'Isabel Torres', direccion: 'Avenida 123', telefono: '555-8901'},
  {id: 11, nombre: 'Alejandro Ruiz', direccion: 'Calle 456', telefono: '555-2345'},
  {id: 12, nombre: 'Laura Díaz', direccion: 'Avenida 789', telefono: '555-6789'},
  {id: 13, nombre: 'Ricardo Moreno', direccion: 'Calle 012', telefono: '555-1234'},
  {id: 14, nombre: 'Fernanda Cruz', direccion: 'Avenida 345', telefono: '555-5678'},
  {id: 15, nombre: 'Mauricio González', direccion: 'Calle 678', telefono: '555-9012'},
  {id: 16, nombre: 'Paola Hernández', direccion: 'Avenida 901', telefono: '555-3456'},
  {id: 17, nombre: 'Arturo Torres', direccion: 'Calle 234', telefono: '555-7890'},
  {id: 18, nombre: 'Gabriela Reyes', direccion: 'Avenida 567', telefono: '555-2345'},
  {id: 19, nombre: 'Francisco Vargas', direccion: 'Calle 890', telefono: '555-6789'},
  {id: 20, nombre: 'Daniela Valenzuela', direccion: 'Avenida 123', telefono: '555-0123'},
];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'telefono','action'];
  dataSource: MatTableDataSource<UserTable> = new MatTableDataSource<UserTable>(ELEMENT_DATA);

  currentDate: Date = new Date();
  dates: Date[] = [];

  selectedDate: Date;

  selectDate(date: Date) {
    this.selectedDate = date;
  }

  ngOnInit() {
    this.fillDatesArray();
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
    container.scrollBy({ left: -80, behavior: 'smooth' });
  }
  scrollNext() {
    const container = document.getElementById('container');
    container.scrollBy({ left: 80, behavior: 'smooth' });
  }

  highlightDate(event: MouseEvent) {
    const element = event.target as HTMLElement;

    // Remove the highlight class from any previously highlighted dates
    const highlightedDates = document.querySelectorAll('.highlighted-date');
    highlightedDates.forEach((date) => {
      date.classList.remove('highlighted-date');
    });

    // Add the highlight class to the clicked date element
    element.classList.add('highlighted-date');
  }

  ngAfterViewInit(){

    this.dataSource = new MatTableDataSource<UserTable>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }




}



