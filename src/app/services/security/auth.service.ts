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
    this.visualizado.next(this.checkVisualizado());
  }

  getToken() {
    if (this.checkToken()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private getRol() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(token);
      return decoded.rol;
    }
    return null;
  }

  private checkHasPaid(): boolean {
    console.log("checkHasPaid");
    
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(token);
      return decoded.hasPaid;
    }
    return false;
  }

  private checkVisualizado(): boolean {
    console.log("checkVisualizado");
    
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
