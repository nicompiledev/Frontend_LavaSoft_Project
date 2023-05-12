import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-perfil-menu',
  templateUrl: './perfil-menu.component.html',
  styleUrls: ['./perfil-menu.component.scss']
})
export class PerfilMenuComponent {

  constructor(public auth: AuthService){}

  logout(): void {
    this.auth.logout();
  }

}
