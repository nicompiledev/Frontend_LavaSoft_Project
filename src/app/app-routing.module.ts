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
import { CatalogueComponent } from './componentes/views/catalogue/catalogue.component';
import { ProfileCarwashComponent } from './componentes/views/profile-carwash/profile-carwash.component';

import { CompaniesComponent } from './componentes/views/companies/companies.component';
import { PrincipalComponent } from './componentes/views/principal/principal.component';
import { ReserveComponent } from './componentes/usuario/profile_carwash/reserve/reserve.component';
import { RegisterCarwashComponent } from './componentes/lavaderos/register-carwash/register-carwash.component';

// CHAT
import { ChatAdminComponent } from './componentes/admin/chat-admin/chat-admin.component';

// ADMIN
import { NavegacionComponent } from './componentes/admin/dashboard/navegacion/navegacion.component';
import { LavaderosPendientesComponent } from './componentes/admin/dashboard/lavaderos-pendientes/lavaderos-pendientes.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: PrincipalComponent},
  { path: 'login', component: LoginComponent , canActivate: [AuthGuard]},
  { path: 'registro', component: RegistrarComponent, canActivate: [AuthGuard] },
  { path: 'confirmar/:token', component: ConfirmarCuentaComponent },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
  { path: 'nuevo-password/:token', component: NuevaContrasenaComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'perfil/:id', component: ActualizarPerfilComponent, canActivate: [AuthGuard] },
  { path: 'actualizar-password', component: ActualizarPasswordComponent, canActivate: [AuthGuard]},
  { path: 'catalogue' ,component:CatalogueComponent},
  {path: 'profile_carwash/:id', component: ProfileCarwashComponent},
  {path: 'empresas' , component:CompaniesComponent},
  {path:'reserva', component: ReserveComponent},
  {path:'empresas/registro_lavadero' , component: RegisterCarwashComponent},
  {path:'perfil_usuario' , component: PerfilComponent},
  // CHAT
  { path: 'chat-admin', component: ChatAdminComponent },
  // ADMIN
  { path: 'dashboard-admin', component: NavegacionComponent ,
    children: [
      { path: 'peticion-empresa', component:  LavaderosPendientesComponent},
      { path: 'reportes', component:  LavaderosPendientesComponent},
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }