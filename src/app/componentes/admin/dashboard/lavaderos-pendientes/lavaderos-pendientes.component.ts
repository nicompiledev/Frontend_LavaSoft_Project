import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PeticionLavaderoModalService } from 'src/app/services/comunicación/peticion-lavadero-modal.service';

export interface LavaderoData {
  id: number;
  NIT: number;
  nombreLavadero: string;
  ciudad: string;
  telefono: number;
}

@Component({
  selector: 'app-lavaderos-pendientes',
  templateUrl: './lavaderos-pendientes.component.html',
  styleUrls: ['./lavaderos-pendientes.component.scss']
})
export class LavaderosPendientesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['NIT', 'nombreLavadero', 'ciudad', 'telefono'];
  dataSource: MatTableDataSource<LavaderoData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  lavaderos: any[] = [];
  constructor(private adminService: AdminService , private modal: ModalReserveService, private peticionLavaderoModal: PeticionLavaderoModalService) {

  }

  ngOnInit() {
    this.adminService.getLavaderosNoConfirmados().subscribe((response: any) => {
      this.lavaderos = response;
      this.dataSource = new MatTableDataSource(this.lavaderos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    if(this.dataSource != undefined){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(stateModal:boolean , focus:string, row: any) {
    this.modal.estadomodal(stateModal , focus);

    this.peticionLavaderoModal.setLavadero(row);

  }
}
