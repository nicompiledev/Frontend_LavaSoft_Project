import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmarUsuarioComponent } from './componentes/usuario/confirmar-usuario/confirmar-usuario.component';
import { LoginUsuarioComponent } from './componentes/usuario/login-usuario/login-usuario.component';
import { NuevaContrasenaUsuarioComponent } from './componentes/usuario/nueva-contrasena-usuario/nueva-contrasena-usuario.component';
import { RecuperarContrasenaUsuarioComponent } from './componentes/usuario/recuperar-contrasena-usuario/recuperar-contrasena-usuario.component';
import { RegistrarUsuarioComponent } from './componentes/usuario/registrar-usuario/registrar-usuario.component';

const routes: Routes = [
  { path: '', component: RegistrarUsuarioComponent },
  { path: 'confirmar/:token', component: ConfirmarUsuarioComponent },
  { path: 'login', component: LoginUsuarioComponent },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaUsuarioComponent },
  { path: 'olvide-password/:token', component: NuevaContrasenaUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }