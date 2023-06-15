import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedireccionGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Verificar si se redireccionó desde el backend
    const queryParams = route.queryParams;
    const isRedireccionado = queryParams && queryParams['redireccionado'] === 'true';

    if (isRedireccionado) {
      return true; // Permite el acceso a la ruta '/agradecimiento'
    } else {
      // Si no se redireccionó desde el backend, redirige a otra página
      return this.router.parseUrl('/inicio');
    }
  }
}
