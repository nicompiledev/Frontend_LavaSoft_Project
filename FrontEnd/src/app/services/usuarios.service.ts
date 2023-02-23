import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:4000/api/usuarios/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: Usuario) {
    return this.http.post(this.apiUrl, usuario, this.httpOptions);
  }

  confirmarUsuario(token: string) {
    return this.http.get(`${this.apiUrl}confirmar/${token}`);
  }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post(this.apiUrl+'login', body, this.httpOptions);
  }

  enviarCorreo(email: string) {
    return this.http.post(`${this.apiUrl}olvide-password`, { email }, this.httpOptions);
  }

  comprobarToken(token: string) {
    return this.http.get(`${this.apiUrl}olvide-password/${token}`);
  }

  nuevoPassword(token: string, password: string) {
    return this.http.post(`${this.apiUrl}olvide-password/${token}`, { password }, this.httpOptions);
  }
}
