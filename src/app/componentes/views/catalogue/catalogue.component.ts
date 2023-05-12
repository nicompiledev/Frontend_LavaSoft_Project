import { Component, HostListener } from '@angular/core';
import { anonimoService } from 'src/app/services/anonimo.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent {

  isFixed = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    this.isFixed = scrollTop >= documentHeight - windowHeight - 300;
    document.documentElement.style.setProperty('--top', documentHeight - windowHeight - 300 + 'px');
  }

  lavaderos: any = [];
  loading: boolean = true;
  page: number = 1;
  hasMoreResults: boolean = true;
  hasLessResults: boolean = false;

  constructor(
    private anonimoService: anonimoService,
    private loader: LoaderService
  ) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.paginacion();
  }

  // Botones de paginación
  nextPage() {
    this.page++;
    this.paginacion();
    this.hasLessResults = true;
  }

  previousPage() {
    if (this.page == 2) {
      this.hasLessResults = false;
    }
    this.page--;
    this.paginacion();
  }

  paginacion() {
    this.loader.showLoader();
    this.anonimoService
      .getLavaderos(this.page)
      .pipe(finalize(() => this.loader.hideLoader()))
      .subscribe((res: any) => {
        if (res.length > 0) {
          this.lavaderos = res;
          this.hasMoreResults = res.length === 10;
        } else {
          this.hasMoreResults = false;
          if (this.page > 1) {
            this.page--;
          }
        }
        this.loading = false;
      });
  }


  
}
