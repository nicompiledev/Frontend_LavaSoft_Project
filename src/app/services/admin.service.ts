import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './security/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private url = 'http://localhost:4000/api/admins/';
  private httpOptions: any = {};

  isLoggedIn: boolean;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.isLoggedIn().subscribe(
      (isLoggedIn: boolean) => {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.auth.getToken()}`,
          }),
        };
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  loginAdmin(correo_electronico: string, contrasena: string) {
    const body = { correo_electronico, contrasena };
    return this.http.post(this.url + 'login', body, this.httpOptions);
  }

  getAllLavaderos() {
    return this.http.get(`${this.url}lavaderos`, this.httpOptions);
  }

  getLavadero(id_lavadero: string) {
    return this.http.get(
      `${this.url}lavaderos/${id_lavadero}`,
      this.httpOptions
    );
  }

  updateLavadero(datos: any, id_lavadero: string) {
    return this.http.put(
      `${this.url}lavaderos/${id_lavadero}`,
      datos,
      this.httpOptions
    );
  }

  deleteLavadero(id_lavadero: string) {
    return this.http.delete(`${this.url}lavaderos/${id_lavadero}`);
  }

  activarLavadero(id_lavadero: string) {
    return this.http.post(`${this.url}lavaderos/activar`, { id_lavadero });
  }

  noActivarLavadero(id_lavadero: string) {
    return this.http.post(`${this.url}lavaderos/no-activar`, { id_lavadero }, this.httpOptions);
  }

  getLavaderosNoConfirmados() {
    if(this.isLoggedIn){
    return this.http.get(`${this.url}lavaderos/no-confirmados`, this.httpOptions);
    }else{
      return null;
    }
  }

  getReportes(page: number = 1,) {
    let params = new HttpParams().set('page', page.toString());
    return this.http.get(`${this.url}reportes`, { params , headers: this.httpOptions.headers});
  }

  aceptarReporte(id_reporte: string) {
    return this.http.post(`${this.url}reportes/aceptar`, { id_reporte }, this.httpOptions);
  }


}
