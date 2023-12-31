import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalReserveService {
  $modal_report = new BehaviorSubject<boolean>(false)
  $modal_reserve = new BehaviorSubject<any>(false);
  $modal = new BehaviorSubject<number>(0);
  $modal_vehicle = new BehaviorSubject<boolean>(false);
  $modal_cancel = new BehaviorSubject<any>(false);
  $modal_employee = new BehaviorSubject<any>(false);
  $modal_register_reserve = new BehaviorSubject<any>(false);
  $modal_history = new BehaviorSubject<any>(false);
  

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
        this.$modal_vehicle.next(modal);
        break;

      case 'reports':
        this.$modal_report.next(modal);
        break;

      case 'acceptance':
      this.$modal_reserve.next(modal);
      break;

      case 'register_reserve':
        this.$modal_register_reserve.next(modal);
        break;

      case 'vehicle_reserve':
        this.$modal_vehicle.next(modal);
        break;

      case 'cancel_reserve':
        this.$modal_cancel.next({ estado: modal, servicio: servicio });
        break;

      case 'add_employee':
        this.$modal_employee.next({ estado: modal, servicio: servicio });
        break;
      case 'history':
        this.$modal_history.next(modal);
        break;
        
      default:
        break;
    }
  }
}
