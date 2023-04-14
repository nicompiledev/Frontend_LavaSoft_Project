import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from './security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:4000/api/usuarios/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  isLoggedIn: boolean;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.isLoggedIn().subscribe(
      (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  registrarUsuario(usuario: object) {
    return this.http.post(this.apiUrl, usuario, this.httpOptions);
  }

  confirmarUsuario(token: string) {
    return this.http.get(`${this.apiUrl}confirmar/${token}`);
  }

  login(correo_electronico: string, contrasena: string) {
    const body = { correo_electronico, contrasena };
    return this.http.post(this.apiUrl+'login', body, this.httpOptions);
  }

  enviarCorreo(correo_electronico: string) {
    return this.http.post(`${this.apiUrl}olvide-password`, { correo_electronico }, this.httpOptions);
  }

  nuevoPassword(token: string, contrasena: string) {
      const url = `${this.apiUrl}nuevo-password/${token}`;
      return this.http.post(url,  { contrasena }, this.httpOptions);
  }

  getPerfil() {
    if (this.isLoggedIn){
      return this.http.get(this.apiUrl + 'perfil', this.httpOptions).pipe(
        map((res: any) => {
          return res; // asumiendo que la respuesta del servidor tiene una propiedad "usuario" que contiene los datos del usuario
        })
      );
    } else {
      return of(null);
    }
  }

  actualizarPassword(pwd_actual: string, pwd_nuevo: string) {

    const body = {
      pwd_actual: pwd_actual,
      pwd_nuevo: pwd_nuevo
    };

    return this.http.put(this.apiUrl + 'actualizar-password', body, this.httpOptions);
  }

  actualizarPerfil(id: string, data: any) {
    return this.http.put(this.apiUrl + "perfil/" + id, data, this.httpOptions);
  }
}

