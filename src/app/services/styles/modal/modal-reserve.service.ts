import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalReserveService {

  constructor() { }

  $modal_reserve = new EventEmitter<any>;
  $modal_home = new  EventEmitter<any>;

}
