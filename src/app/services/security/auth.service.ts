import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = new BehaviorSubject<boolean>(this.checkToken());
  hasPaid = new BehaviorSubject<boolean>(this.checkHasPaid());
  visualizado = new BehaviorSubject<boolean>(this.checkVisualizado());
  rol = new BehaviorSubject<string>(this.getRol());

  private checkToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isLogin.next(true);
    this.rol.next(this.getRol());
    this.hasPaid.next(this.checkHasPaid());
  }

  getToken() {
    if (this.checkToken()) {
      return localStorage.getItem('token');
    }
    return 'No hay token';
  }

  private getRol() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(token);
      return decoded.rol;
    }
    return 'No hay rol';
  }

  private checkHasPaid(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(token);
      return decoded.hasPaid;
    }
    return false;
  }

  private checkVisualizado(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(token);
      return decoded.visualizado;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLogin.next(false);
    this.rol.next(null);
    this.hasPaid.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

}
