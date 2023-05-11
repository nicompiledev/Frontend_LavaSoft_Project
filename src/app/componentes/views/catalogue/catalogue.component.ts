import { Component } from '@angular/core';
import { anonimoService } from 'src/app/services/anonimo.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {

  lavaderos: any = {};
  loading: boolean = true;

  constructor(private anonimoService: anonimoService, private loader: LoaderService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loader.showLoader();

    this.anonimoService.getLavaderos(1)
    .pipe(
      finalize(() => this.loader.hideLoader())
    )
    .subscribe((res) => {
      this.lavaderos = res
      this.loading = false;
    })
  }

}
