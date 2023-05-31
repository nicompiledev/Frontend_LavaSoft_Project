import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // el BehaviorSubject que nos permitirá guardar el estado de login
  //tendrá un estado inicial booleano según lo que retorne checkToken
  isLogin = new BehaviorSubject<boolean>(this.checkToken());
  // ROL:
  rol = new BehaviorSubject<string>(this.getRol());

  //método que nos permitirá chequear si existe un token, en tal
  //caso retornará true
  private checkToken(): boolean {
    return !!localStorage.getItem('token');
  }

  //método que nos permite establecer el token en el almacenamiento local
  //y enviar una señal del BehaviorSubject para establecer su nuevo valor en
  //true para indicar que estamos logueados
  login(token: string, rol: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
    this.isLogin.next(true);
  }

  getToken() {
    if (this.checkToken()) {
      return localStorage.getItem('token');
    }
    return 'No hay token';
  }

  getRol() {
    if (this.checkToken()) {
      return localStorage.getItem('rol');
    }
    return 'No hay rol';
  }

  //método que nos permite romover el token almacenado y el nombre del
  //usuario actual y enviar una señal al BehaviorSubject para establecer
  //su nuevo valor, en este caso false para indicar que no estamos logueados
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.isLogin.next(false);
  }

  //método que nos retorna el BehaviorSubject cómo un observable
  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

}
