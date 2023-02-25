import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private servicio: UsuarioService) {}

  canActivate() {
    if (this.servicio.isLoggedIn()) {
      this.router.navigate(['/perfil']);
      return false;
    }

    return true;
  }
}