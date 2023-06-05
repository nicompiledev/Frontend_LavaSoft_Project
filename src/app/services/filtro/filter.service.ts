import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private ciudadFilterSubject = new BehaviorSubject<string>(null);
  private tipoVehiculoFilterSubject = new BehaviorSubject<string>(null);
  private orderByPopularityFilterSubject = new BehaviorSubject<boolean>(false);
  private nombreFilterSubject = new BehaviorSubject<string>(null);

  ciudadFilter$ = this.ciudadFilterSubject.asObservable();
  tipoVehiculoFilter$ = this.tipoVehiculoFilterSubject.asObservable();
  orderByPopularityFilter$ = this.orderByPopularityFilterSubject.asObservable();
  nombreFilter$ = this.nombreFilterSubject.asObservable();

  filters$ = combineLatest([
    this.ciudadFilter$,
    this.tipoVehiculoFilter$,
    this.orderByPopularityFilter$,
    this.nombreFilter$,
  ]);

  setCiudadFilter(ciudad: string) {
    this.ciudadFilterSubject.next(ciudad);
  }

  setTipoVehiculoFilter(tipoVehiculo: string) {
    this.tipoVehiculoFilterSubject.next(tipoVehiculo);
  }

  setOrderByPopularityFilter(orderByPopularity: boolean) {
    this.orderByPopularityFilterSubject.next(orderByPopularity);
  }

  setNombreFilter(nombre: string) {
    this.nombreFilterSubject.next(nombre);
  }
}
