import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class anonimoService {
  private apiUrl = 'http://localhost:4000/api/anonimo/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  /*   filters$ = combineLatest([
    this.departamentoFilter$,
    this.ciudadFilter$,
    this.sectorFilter$,
    this.tipoVehiculoFilter$,
    this.orderByPopularityFilter$,
  ]); */
  getLavaderos(
    page: number = 1,
    departamento: string = null,
    ciudad: string = null,
    sector: string = null,
    tipoVehiculo: string = null,
    orderByPopularity: boolean = false
  ) {

    let params = new HttpParams().set('page', page.toString());

    if (departamento) {
      params = params.set('departamento', departamento);
    }

    if (ciudad) {
      params = params.set('ciudad', ciudad);
    }

    if (sector) {
      params = params.set('sector', sector);
    }

    if (tipoVehiculo) {
      params = params.set('tipoVehiculo', tipoVehiculo);
    }

    if (orderByPopularity) {
      params = params.set('orderByPopularity', orderByPopularity.toString());
    }

    console.log(params);

    return this.http.get(`${this.apiUrl}lavaderos`, { params });
  }

  getLavadero(id: string) {
    return this.http.get(`${this.apiUrl}lavadero/${id}`, this.httpOptions);
  }
}
