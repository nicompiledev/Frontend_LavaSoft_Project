import { Component, OnInit } from '@angular/core';
import { InputService } from 'src/app/services/comunicación/input.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-services-carwash',
  templateUrl: './services-carwash.component.html',
  styleUrls: ['./services-carwash.component.scss'],
})
export class ServicesCarwashComponent implements OnInit {

  servicios: any[] = [];

  constructor(
    private modal_service: ModalReserveService,
    private input: InputService
  ) {}

  ngOnInit(): void {
    this.input.$servicios.subscribe((servicios) => {
      this.servicios = servicios;
    });
  }

  openModal(stateModal: boolean, focus: string) {
    this.modal_service.estadomodal(stateModal, focus);
  }
}
