import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './security/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LavaderoService {

  private url = 'https://lavasoft-servidor.onrender.com/api/lavaderos/';
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

  getReservasNoAtendidas(fecha: string){
    return this.http.post(`${this.url}reservas`, {fecha}, this.httpOptions);
  }

  confirmarReserva(id_reserva: string, id_usuario: string, nombre_servicio: string, nombreEmpleado: string) {
    return this.http.put(`${this.url}reservas/confirmar`, {id_reserva, id_usuario, nombre_servicio, nombreEmpleado}, this.httpOptions);
  }

  getReservarProceso(){
    return this.http.get(`${this.url}reservas/proceso`, this.httpOptions);
  }

  terminarReserva(id_reserva: string, id_usuario: string) {
    return this.http.put(`${this.url}reservas/terminar`, {id_reserva, id_usuario}, this.httpOptions);
  }

  getReservasTerminadas(fecha: string){
    return this.http.post(`${this.url}reservas/terminadas`, {fecha}, this.httpOptions);
  }

  refreshToken(){
    return this.http.get(`${this.url}refreshToken`, this.httpOptions);
  }
}
