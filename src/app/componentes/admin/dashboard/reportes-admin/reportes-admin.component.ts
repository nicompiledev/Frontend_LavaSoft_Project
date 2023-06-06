import { Component } from '@angular/core';
import {
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/services/admin.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';

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

  // Paginacion
  currentPage: number = 1;
  totalPages: number;
  pagesToShow = 3;
  pages: number[];
  showEllipsisStart = false;
  showEllipsisEnd = false;

  constructor( private loader: LoaderService, private adminService: AdminService) {
    this.cambiarPagina();
  }

  cambiarPagina() {

        //this.totalPages = res.totalPages;
        this.updatePages();
        this.loader.showLoader();
        this.adminService.getReportes(this.currentPage).subscribe((res: any) => {
          this.loader.hideLoader();
          this.reportes = res.reportes;
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
    this.adminService.aceptarReporte(id).subscribe((res: any) => {
      this.cambiarPagina();
    });
  }
}
