import { Component, OnInit } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { ActivatedRoute } from '@angular/router';
import { anonimoService } from 'src/app/services/anonimo.service';
import { InputService } from 'src/app/services/comunicación/input.service';

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
    private modal_service: ModalReserveService
  ) {}

  active: boolean = false;

  ngOnInit(): void {
    this.modal_service.$modal_reserve.subscribe((valor) => {
      this.active = valor;
    });

    // traer id con validaciones
    const id = this.route.snapshot.paramMap.get('id');

    this.anonimoService.getLavadero(id).subscribe((res: any) => {
      this.input.getImagenes(res.imagenes);
    });
  }
}
