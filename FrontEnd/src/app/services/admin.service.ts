import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private url = 'http://localhost:4000/api/lavaderos/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data;',
    }),
  };
  constructor(private http: HttpClient) {}


  registrarLavadero(formData: FormData) {
    return this.http.post(`${this.url}peticion`, formData);
  }

  loginAdmin(correo_electronico: string, contasena: string) {
    const body = { correo_electronico, contasena };
    return this.http.post(this.url + 'login', body, this.httpOptions);
    // Cuando se haga el componete poner esto:
    //  localStorage.setItem('token', response.token);
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
