import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private departamentoFilterSubject = new BehaviorSubject<string>(null);
  private ciudadFilterSubject = new BehaviorSubject<string>(null);
  private sectorFilterSubject = new BehaviorSubject<string>(null);
  private tipoVehiculoFilterSubject = new BehaviorSubject<string>(null);
  private orderByPopularityFilterSubject = new BehaviorSubject<boolean>(false);
  private nombreFilterSubject = new BehaviorSubject<string>(null);

  departamentoFilter$ = this.departamentoFilterSubject.asObservable();
  ciudadFilter$ = this.ciudadFilterSubject.asObservable();
  sectorFilter$ = this.sectorFilterSubject.asObservable();
  tipoVehiculoFilter$ = this.tipoVehiculoFilterSubject.asObservable();
  orderByPopularityFilter$ = this.orderByPopularityFilterSubject.asObservable();

  filters$ = combineLatest([
    this.departamentoFilter$,
    this.ciudadFilter$,
    this.sectorFilter$,
    this.tipoVehiculoFilter$,
    this.orderByPopularityFilter$,
  ]);

  // FILTRO BASICO
  setDepartamentoFilter(departamento: string) {
    this.departamentoFilterSubject.next(departamento);
  }

  setCiudadFilter(ciudad: string) {
    this.ciudadFilterSubject.next(ciudad);
  }

  setSectorFilter(sector: string) {
    this.sectorFilterSubject.next(sector);
  }

  // FILTRO AVANZADO
  setTipoVehiculoFilter(tipoVehiculo: string) {
    this.tipoVehiculoFilterSubject.next(tipoVehiculo);
  }

  setOrderByPopularityFilter(orderByPopularity: boolean) {
    this.orderByPopularityFilterSubject.next(orderByPopularity);
  }

}
