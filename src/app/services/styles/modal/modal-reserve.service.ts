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
    if (focus == 'profile_carwash') {
      this.$modal.next(modal);
    } else if (focus == 'reserve') {
      this.$modal_reserve.next({ estado: modal, servicio: servicio })
    }else if (focus == 'register_vehicle'){
      console.log(modal)
      this.$modal.next(modal)
      
    }
  }
}
