import { Component } from '@angular/core';
import {
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.component.html',
  styleUrls: ['./reportes-admin.component.scss']
})
export class ReportesAdminComponent {
  // fontawesome
  mensaje = faEnvelope;

  // reportes:
  reportes: any[] = [];
  tipo: string = '';

  // Paginacion
  currentPage: number = 1;
  totalPages: number;
  pagesToShow = 3;
  pages: number[];
  showEllipsisStart = false;
  showEllipsisEnd = false;

  constructor(private loader: LoaderService, private adminService: AdminService) {
    this.cambiarPagina();
  }

  filtrarReportes(event: any) {
    this.tipo = event.target.value;
    this.currentPage = 1;
    this.cambiarPagina();
  }

  cambiarPagina() {
        this.loader.showLoader();
        this.adminService.getReportes(this.currentPage, this.tipo)
        .pipe(finalize(() => this.loader.hideLoader()))
        .subscribe((res: any) => {
          this.totalPages = res.totalPages;
          this.reportes = res.reportes;
          this.updatePages();
        }
      );
  }


  goToFirstPage() {
    this.currentPage = 1;
    this.cambiarPagina();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cambiarPagina();
    }
  }

  goToPage(page: number) {
    if(page == this.currentPage) return;
    this.currentPage = page;
    this.cambiarPagina();
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.cambiarPagina();
    }
  }

  updatePages() {
    if (this.totalPages <= this.pagesToShow) {
      this.pages = [];
      for (let i = 1; i <= (this.totalPages); i++) {
        this.pages.push(i);
      }
    } else {
      const startPage = Math.max(2, this.currentPage - Math.floor(this.pagesToShow / 2));
      const endPage = Math.min(this.totalPages, startPage + this.pagesToShow - 1);
      this.pages = [];
      for (let i = startPage; i <= endPage; i++) {
        this.pages.push(i);
      }
      this.showEllipsisStart = startPage > 2;
      // cuando la pagina actual falta 2 para llegar al final:
      this.showEllipsisEnd = endPage < this.totalPages;
    }
  }


  // reportes:
  aceptarReporte(id: string) {
    this.loader.showLoader();
    this.adminService.aceptarReporte(id)
    .pipe(finalize(() => this.loader.hideLoader()))
    .subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Reporte aceptado',
        text: res.msg,
        confirmButtonText: 'Aceptar'
      });

      this.cambiarPagina();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.msg,
        confirmButtonText: 'Aceptar'
      });
    });
  }

  rechazarReporte(id: string) {
    this.loader.showLoader();
    this.adminService.rechazarReporte(id)
    .pipe(finalize(() => this.loader.hideLoader()))
    .subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Reporte rechazado',
        text: res.msg,
        confirmButtonText: 'Aceptar'
      });

      this.cambiarPagina();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.msg,
        confirmButtonText: 'Aceptar'
      });
    });
  }
}
