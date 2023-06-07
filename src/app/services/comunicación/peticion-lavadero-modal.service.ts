import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionLavaderoModalService {


  private lavadero = new BehaviorSubject<any[]>([]);
  $lavadero = this.lavadero.asObservable();

  constructor() { }

  setLavadero(lavadero: any[]){
    this.lavadero.next(lavadero);
  }

}
