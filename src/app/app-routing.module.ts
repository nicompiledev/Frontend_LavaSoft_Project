import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;
import { ActualizarPerfilComponent } from './componentes/usuario/actualizar-perfil/actualizar-perfil.component';
import { ConfirmarCuentaComponent } from './componentes/usuario/confirmar-cuenta/confirmar-cuenta.component';
import { LoginComponent } from './componentes/principales/login/login.component';
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
import { ChatAdminComponent } from './componentes/admin/dashboard/chat-admin/chat-admin.component';

// ADMIN
import { NavegacionComponent } from './componentes/admin/dashboard/navegacion/navegacion.component';
import { LavaderosPendientesComponent } from './componentes/admin/dashboard/lavaderos-pendientes/lavaderos-pendientes.component';
import { LoginAdminComponent } from './componentes/admin/login-admin/login-admin.component';

import { ReportesAdminComponent } from './componentes/admin/dashboard/reportes-admin/reportes-admin.component';
import { PerfilUsuarioComponent } from './componentes/views/usuario/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  // Inicio
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: PrincipalComponent},

  // Desde el correo
  { path: 'confirmar/:token', component: ConfirmarCuentaComponent },
  { path: 'nuevo-password/:token', component: NuevaContrasenaComponent },

  // Pendiente ELIMINAR
  { path: 'perfil/:id', component: ActualizarPerfilComponent },

  // Prinicpales
  // Catalogo
  { path: 'catalogue' ,component:CatalogueComponent},
    {path: 'profile_carwash/:id', component: ProfileCarwashComponent},
    {path: 'data' , component:ProfileCarwashComponent},
  // Enoresa
  {path: 'empresas' , component:CompaniesComponent},
    { path: 'empresas/registro_lavadero', component:  RegisterCarwashComponent},

  // Usuario
  {path:'perfil_usuario' , component: PerfilUsuarioComponent, canActivate: [AuthGuard]},
  {path:'perfil_usuarios' , component: PerfilComponent},

  // ADMIN
  { path: 'login-admin', component: LoginAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin', component: NavegacionComponent, canActivate: [AuthGuard],
    children: [
      { path: 'peticion-empresa', component:  LavaderosPendientesComponent},
      { path: 'reportes', component:  ReportesAdminComponent},
      { path: 'chat-asesor', component:  ChatAdminComponent},
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },

  { path: 'prueba-reportes', component:  ReportesAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }