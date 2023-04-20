import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarPasswordComponent } from './componentes/usuario/actualizar-password/actualizar-password.component';
import { ActualizarPerfilComponent } from './componentes/usuario/actualizar-perfil/actualizar-perfil.component';
import { ConfirmarCuentaComponent } from './componentes/usuario/confirmar-cuenta/confirmar-cuenta.component';
import { LoginComponent } from './componentes/usuario/login/login.component';
import { NuevaContrasenaComponent } from './componentes/usuario/nueva-contrasena/nueva-contrasena.component';
import { PerfilComponent } from './componentes/usuario/perfil/perfil.component';
import { RecuperarContrasenaComponent } from './componentes/usuario/recuperar-contrasena/recuperar-contrasena.component';
import { RegistrarComponent } from './componentes/usuario/registrar/registrar.component';
import { AuthGuard } from './guard/auth.guard';
import { LavaderoComponent } from './componentes/lavadero/lavadero.component';
import { RegistrarLavaderoComponent } from './componentes/admin/registrar-lavadero/registrar-lavadero.component';
import { CatalogueComponent } from './componentes/views/catalogue/catalogue.component';


const routes: Routes = [
  { path: '', component: LoginComponent , canActivate: [AuthGuard]},
  { path: 'registro', component: RegistrarComponent, canActivate: [AuthGuard] },
  { path: 'confirmar/:token', component: ConfirmarCuentaComponent },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
  { path: 'nuevo-password/:token', component: NuevaContrasenaComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'perfil/:id', component: ActualizarPerfilComponent, canActivate: [AuthGuard] },
  { path: 'actualizar-password', component: ActualizarPasswordComponent, canActivate: [AuthGuard]},
  { path: 'reservar/:id', component: LavaderoComponent},
  { path: 'registro-lavadero', component: RegistrarLavaderoComponent},
  { path: 'catalogue' ,component:CatalogueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }