import { Component } from '@angular/core';
import { LavaderoService } from 'src/app/services/lavadero.service';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';

@Component({
  selector: 'app-subscripcion',
  templateUrl: './subscripcion.component.html',
  styleUrls: ['./subscripcion.component.scss']
})
export class SubscripcionComponent {
  item: string = "price_1NI122AzE9bVeUHybCHKYaeq"


  constructor(private lavaderoService: LavaderoService, private loader: LoaderService) { }

  irAPagar(){
    this.loader.showLoader();
    this.lavaderoService.crearSesionPago(this.item)
    .pipe(
      finalize(() => this.loader.hideLoader())
    )
    .subscribe(
      (res: any) => {
        window.location.href = res.url;
      },
      (err: any) => console.log(err)
    );
  }
}
