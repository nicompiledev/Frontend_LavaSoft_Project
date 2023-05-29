import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LavaderoService {

  private url = 'http://localhost:4000/api/lavaderos/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    }),
  };
  constructor(private http: HttpClient) {}

  registrarLavadero(formData: FormData) {
    return this.http.post(`${this.url}peticion`, formData);
  }
}
