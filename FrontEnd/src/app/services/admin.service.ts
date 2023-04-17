import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private url = 'http://localhost:4000/api/admins/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient) {}


  registrarLavadero(formData: FormData) {
    return this.http.post(`${this.url}registrar-lavadero`, formData);
  }

  loginAdmin(correo_electronico: string, contasena: string) {
    const body = { correo_electronico, contasena };
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

}
