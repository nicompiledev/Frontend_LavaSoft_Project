import { Component, OnInit } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-carwash',
  templateUrl: './profile-carwash.component.html',
  styleUrls: ['./profile-carwash.component.scss'],
})
export class ProfileCarwashComponent implements OnInit {
  lavadero: any;

  constructor(
    private route: ActivatedRoute,
    private modal_service: ModalReserveService
  ) {}

  active: boolean = false;

  ngOnInit(): void {
    this.modal_service.$modal_reserve.subscribe((valor) => {
      this.active = valor;
    });

    this.route.queryParams.subscribe((params) => {
      this.lavadero = JSON.parse(params['data']);
      console.log(this.lavadero);
    });
  }
}
