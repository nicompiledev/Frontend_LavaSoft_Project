import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class anonimoService {
  private apiUrl = 'https://lavasoft-servidor.onrender.com/api/anonimo/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

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

    return this.http.get(`${this.apiUrl}lavaderos`, { params });
  }

  getLavadero(id: string) {
    return this.http.get(`${this.apiUrl}lavadero/${id}`, this.httpOptions);
  }

  getLavaderosRadio(longitud:number, latitud: number){    
    return this.http.post(`${this.apiUrl}lavaderosRadio`, {longitud, latitud}, this.httpOptions);
  }
}
