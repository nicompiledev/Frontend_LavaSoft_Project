import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LavaderoService {

  private url = 'http://localhost:4000/api/lavaderos/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  registrarLavadero(formData: FormData) {
    return this.http.post(`${this.url}peticion`, formData);
  }

  loginLavadero(correo_electronico: string, contrasena: string) {
    console.log(correo_electronico, contrasena);
    
    return this.http.post(`${this.url}login`,{correo_electronico, contrasena}, this.httpOptions);
  }
}
