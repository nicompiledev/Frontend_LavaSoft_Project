import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalReserveService {
  $modal_reserve = new BehaviorSubject<boolean>(false);
  $modal = new BehaviorSubject<number>(0);

  constructor() {}

  estadomodal(modal: any, focus: string) {
    if (focus == 'profile_carwash') {
      this.$modal.next(modal);
    } else if (focus == 'reserve') {
      this.$modal_reserve.next(modal);
    }
  }
}
