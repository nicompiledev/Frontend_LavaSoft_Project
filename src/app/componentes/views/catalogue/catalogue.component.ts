import { Component, HostListener, OnInit } from '@angular/core';
import { anonimoService } from 'src/app/services/anonimo.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { finalize } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { FilterService } from 'src/app/services/filtro/filter.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent {

  isAbsolute = false;
  scrollTop: number;
  windowHeight: number;
  documentHeight: number;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {

    if(document.documentElement.style.getPropertyValue('--top') == '-158px'){
      this.isAbsolute = false;
      document.documentElement.style.setProperty('--top', 0 + 'px');
      this.scrollTop = 0;
      this.windowHeight = 0;
      this.documentHeight = 0;
    }
    else{
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
      this.documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      // documentHeight es el alto total de la página
      this.isAbsolute = this.scrollTop >= this.documentHeight - this.windowHeight - 80;
    }
  }
  constructor(
    private anonimoService: anonimoService,
    private loader: LoaderService,
    private viewportScroller: ViewportScroller,
    private filterService: FilterService
  ) {

    this.filterService.filters$.subscribe(([departamento, ciudad, sector, tipoVehiculo, orderByPopularity]) => {
      // Realiza la lógica de filtrado y muestra los lavaderos actualizados
      this.loader.showLoader();
      this.anonimoService
        .getLavaderos(this.currentPage, departamento, ciudad, sector, tipoVehiculo, orderByPopularity)
        .pipe(finalize(() => this.loader.hideLoader()))
        .subscribe((res: any) => {
          this.lavaderos = res.lavaderos;
          this.totalPages = res.totalPages;
          this.updatePages();
          this.subirVentana();
        }
      );
    });
  }

  subirVentana(){
    this.isAbsolute = false;
    this.scrollTop = 0;
    this.windowHeight = 0;
    this.documentHeight = 0;
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  lavaderos: any = [];

  currentPage: number = 1;
  totalPages: number;
  pagesToShow = 3;
  pages: number[];
  showEllipsisStart = false;
  showEllipsisEnd = false;

  cambiarPagina() {
    this.loader.showLoader();
    this.anonimoService
      .getLavaderos(this.currentPage)
      .pipe(finalize(() => this.loader.hideLoader()))
      .subscribe((res: any) => {
        this.lavaderos = res.lavaderos;
        this.totalPages = res.totalPages;
        this.updatePages();
        this.subirVentana();
      });
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
}

