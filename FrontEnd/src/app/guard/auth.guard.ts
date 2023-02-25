import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private servicio: UsuarioService) {}

  canActivate() {
    if (this.servicio.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}