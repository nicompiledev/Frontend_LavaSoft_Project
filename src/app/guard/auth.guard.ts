import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/security/auth.service'
import { map, take } from 'rxjs/operators';

// Crea un objeto que mapee cada rol a las rutas a las que tiene acceso
const roleRoutes = {
  admin: ['/dashboard-admin', '/dashboard-admin/peticion-empresa', '/dashboard-admin/reportes', '/dashboard-admin/chat-asesor'],
  usuario: ['/perfil_usuario'],
  lavadero: ['/dashboard-lavadero', '/dashboard-lavadero/editarPerfil', '/dashboard-lavadero/reservas', '/dashboard-lavadero/reservas/en-progreso', '/dashboard-lavadero/reservas/completadas',  '/dashboard-lavadero/subscripcion', ]
  // Agrega más roles y rutas aquí
};

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
          if (state.url === '/login-admin') {
            this.router.navigate(['/inicio']);
            return false;
          }
          if (roleRoutes[this.rol].includes(state.url)) {
            return true;
          } else {
            this.router.navigate(['/inicio']);
            return false;
          }
        } else {

          if(state.url === '/login-admin') {
            return true;
          }

          return false;
        }
      })
    );
  }
}
