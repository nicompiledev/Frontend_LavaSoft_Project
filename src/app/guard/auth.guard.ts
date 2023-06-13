import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/security/auth.service'
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  rol: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  this.authService.rol.subscribe(rol => this.rol = rol);

  return this.authService.isLoggedIn().pipe(
    take(1),
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        if (this.rol === 'admin' && (state.url === '/perfil_usuario' || state.url === '/login-admin')) {
          this.router.navigate(['/dashboard-admin']);
          return false;
        }
        if (this.rol === 'usuario' && (state.url === '/dashboard-admin' || state.url === '/login-admin')) {
          this.router.navigate(['/inicio']);
          return false;
        }
        return true;
      } else {
        if (state.url === '/perfil_usuario' || state.url === '/dashboard-admin') {
          this.router.navigate(['/inicio']);
          return false;
        }
        return true;
      }
    })
  );

}
}
