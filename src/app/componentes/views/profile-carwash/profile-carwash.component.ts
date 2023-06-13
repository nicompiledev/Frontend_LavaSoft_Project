import { Component, OnInit } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { ActivatedRoute, Router } from '@angular/router';
import { anonimoService } from 'src/app/services/anonimo.service';
import { InputService } from 'src/app/services/comunicación/input.service';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';

@Component({
  selector: 'app-profile-carwash',
  templateUrl: './profile-carwash.component.html',
  styleUrls: ['./profile-carwash.component.scss'],
})
export class ProfileCarwashComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private anonimoService: anonimoService,
    private input: InputService,
    private modal_service: ModalReserveService,
    private loader: LoaderService,
    private router: Router
  ) {}
  modal: number = 0;
  active: boolean = false;

  ngOnInit(): void {
    this.modal_service.$modal_reserve.subscribe((valor) => {
      this.active = valor.estado;
      this.input.setServicioID(valor.servicio);
    });
    // traer id con validaciones
    const id = this.route.snapshot.paramMap.get('id');

    this.loader.showLoader();

    this.anonimoService.getLavadero(id)
    .pipe(
      finalize(() => this.loader.hideLoader())
    )
    .subscribe((res: any) => {

      if(res == null){
        // volver a catalogo:
        //this.router.navigate(['/catalogue']);
      }

      this.input.setImagenes(res.imagenes);
      this.input.setServicios(res.servicios);
      this.input.setInformacion(res.nombreLavadero, res.ciudad, res.direccion, res.hora_apertura, res.hora_cierre, res.tipoVehiculos)
      this.input.setInformacionBasica(res.descripcion, res.siNoLoRecogen)
    });
  }
}
