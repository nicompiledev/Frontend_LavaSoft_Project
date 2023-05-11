import { Component, OnInit } from '@angular/core';
import { InputService } from 'src/app/services/comunicación/input.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-services-carwash',
  templateUrl: './services-carwash.component.html',
  styleUrls: ['./services-carwash.component.scss'],
})
export class ServicesCarwashComponent implements OnInit {

  servicios: any[] = [];
  login = false;

  constructor(
    private modal_service: ModalReserveService,
    private input: InputService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.input.$servicios.subscribe((servicios) => {
      this.servicios = servicios;
    });

    this.auth.isLogin.subscribe((login) => {
      this.login = login;
    });

  }

  openModal(stateModal: boolean, focus: string, id: string ) {
    if(this.login){
    this.modal_service.estadomodal(stateModal, focus, id);
    }else{
      this.modal_service.estadomodal(1, "profile_carwash");
    }
  }
}
