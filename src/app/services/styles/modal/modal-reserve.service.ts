import { EventEmitter, Injectable } from '@angular/core';
import { log } from 'console';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalReserveService {
  $modal_reserve = new BehaviorSubject<any>(false);
  $modal = new BehaviorSubject<number>(0);

  constructor() {}

  estadomodal(modal: any, focus: string, servicio?: any) {

    switch (focus) {
      case 'profile_carwash':
        this.$modal.next(modal);
        break;
      case 'reserve':
        this.$modal_reserve.next({ estado: modal, servicio: servicio });
        break;
      case 'register_vehicle':
        this.$modal_reserve.next(modal);
        break;
      default:
        break;
    }
  }
}
