import { Component } from '@angular/core';
import { LavaderoService } from 'src/app/services/lavadero.service';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-agradecimiento',
  templateUrl: './agradecimiento.component.html',
  styleUrls: ['./agradecimiento.component.scss']
})
export class AgradecimientoComponent {

  constructor(private lavaderoService: LavaderoService, private loader: LoaderService, private auth : AuthService){
    this.lavaderoService.refreshToken()
    .pipe(finalize(() => this.loader.hideLoader()))
    .subscribe(
      (response: any) => {
        this.auth.login(response.token);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error',
        })
      }
    )
  }

}
