import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalReserveService {
  $modal_reserve = new BehaviorSubject<any>(false);
  $modal = new BehaviorSubject<number>(0);

  constructor() {}

  estadomodal(modal: any, focus: string, id?: string) {
    if (focus == 'profile_carwash') {
      this.$modal.next(modal);
    } else if (focus == 'reserve') {
      this.$modal_reserve.next({ estado: modal, id: id })
    }
  }
}
