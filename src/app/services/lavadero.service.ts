import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './security/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LavaderoService {

  private url = 'http://localhost:4000/api/lavaderos/';
  private httpOptions: any = {};
  isLoggedIn: boolean;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.isLoggedIn().subscribe(
      (isLoggedIn: boolean) => {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.auth.getToken()}`
          })
        };
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  registrarLavadero(formData: FormData) {
    return this.http.post(`${this.url}peticion`, formData);
  }

  loginLavadero(correo_electronico: string, contrasena: string) {
    return this.http.post(`${this.url}login`,{correo_electronico, contrasena}, this.httpOptions);
  }

  crearSesionPago(item: string){
    return this.http.post(`${this.url}irapagar`, {item}, this.httpOptions);
  }
}
