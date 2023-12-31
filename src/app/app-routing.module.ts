
// Modulo principal de la aplicacion
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;
import { AuthGuard } from './guard/auth.guard';

// componentes anonimo
import { CatalogueComponent } from './componentes/views/catalogue/catalogue.component';
import { ProfileCarwashComponent } from './componentes/views/profile-carwash/profile-carwash.component';;

// USUARIO
import { ConfirmarCuentaComponent } from './componentes/usuario/confirmar-cuenta/confirmar-cuenta.component';
import { NuevaContrasenaComponent } from './componentes/usuario/nueva-contrasena/nueva-contrasena.component';
import { ReportesComponent } from './componentes/usuario/reportes/reportes.component';
import { PerfilUsuarioComponent } from './componentes/views/usuario/perfil-usuario/perfil-usuario.component';


// LAVADEROS
import { RegisterCarwashComponent } from './componentes/lavaderos/register-carwash/register-carwash.component';
import { DashboardComponent } from './componentes/lavaderos/dashboard-Lavadero/dashboard/dashboard.component';
import { ReservasComponent } from './componentes/lavaderos/dashboard-Lavadero/reservas/reservas.component';

// Vistas
import { PrincipalComponent } from './componentes/views/principal/principal.component';
import { CompaniesComponent } from './componentes/views/companies/companies.component';

// Admin
import { ChatAdminComponent } from './componentes/admin/dashboard/chat-admin/chat-admin.component';
import { NavegacionComponent } from './componentes/admin/dashboard/navegacion/navegacion.component';
import { LavaderosPendientesComponent } from './componentes/admin/dashboard/lavaderos-pendientes/lavaderos-pendientes.component';
import { LoginAdminComponent } from './componentes/admin/login-admin/login-admin.component';
import { ReportesAdminComponent } from './componentes/admin/dashboard/reportes-admin/reportes-admin.component';
import { EditProfileCarwashComponent } from './componentes/lavaderos/edit-profile-carwash/edit-profile-carwash.component';
import { PendingTableComponent } from './componentes/lavaderos/dashboard-Lavadero/tables/pending-table/pending-table.component';
import { InProgressTableComponent } from './componentes/lavaderos/dashboard-Lavadero/tables/in-progress-table/in-progress-table.component';
import { CompletedTableComponent } from './componentes/lavaderos/dashboard-Lavadero/tables/completed-table/completed-table.component';
import { SubscripcionComponent } from './componentes/lavaderos/dashboard-Lavadero/subscripcion/subscripcion.component';
import { AgradecimientoComponent } from './componentes/lavaderos/agradecimiento/agradecimiento.component';
import { RedireccionGuard } from './guard/redireccion.guard';
import { BookingHistoryComponent } from './componentes/usuario/booking-history/booking-history.component';
import { EstadisticasComponent } from './componentes/lavaderos/dashboard-Lavadero/estadisticas/estadisticas.component';


const routes: Routes = [
  {path: 'historial', component: BookingHistoryComponent},
  // Inicio
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: PrincipalComponent },

  // Desde el correo
  { path: 'confirmar/:token', component: ConfirmarCuentaComponent, canActivate: [RedireccionGuard] },
  { path: 'nueva-contrasena/:token', component: NuevaContrasenaComponent, canActivate: [RedireccionGuard] },

  // Prinicpales
  // Catalogo
  { path: 'catalogue' ,component:CatalogueComponent},
    {path: 'profile_carwash/:id', component: ProfileCarwashComponent},
    {path: 'data' , component:ProfileCarwashComponent},
  // Empresa
  {path: 'empresas' , component:CompaniesComponent},
    { path: 'empresas/registro_lavadero', component:  RegisterCarwashComponent},

  // Usuario
  {path:'perfil_usuario' , component: PerfilUsuarioComponent, canActivate: [AuthGuard]},  // Ruta privada del usuario

  // ADMIN
  { path: 'login-admin', component: LoginAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin', component: NavegacionComponent, canActivate: [AuthGuard],  // Ruta privada del admin
    children: [
      { path: 'peticion-empresa', component:  LavaderosPendientesComponent, canActivate: [AuthGuard]}, // Ruta privada del admin
      { path: 'reportes', component:  ReportesAdminComponent, canActivate: [AuthGuard]}, // Ruta privada del admin
      { path: 'chat-asesor', component:  ChatAdminComponent, canActivate: [AuthGuard]}, // Ruta privada del admin
      { path: '**', redirectTo: '', pathMatch: 'full' } // Ruta privada del admin
    ]
  },
  { path: 'dashboard-lavadero', component: DashboardComponent, canActivate: [AuthGuard], // Ruta privada del lavadero
    children: [
      { path: 'editarPerfil', component:  EditProfileCarwashComponent, canActivate: [AuthGuard]}, // Ruta privada del lavadero
      { path: 'reservas', component:  ReservasComponent, canActivate: [AuthGuard], // Ruta privada del lavadero
        children: [
          { path: '', component:  PendingTableComponent, canActivate: [AuthGuard]}, // Ruta privada del lavadero
          { path: 'en-progreso', component:  InProgressTableComponent, canActivate: [AuthGuard]}, // Ruta privada del lavadero
          { path: 'completadas', component:  CompletedTableComponent, canActivate: [AuthGuard]}, // Ruta privada del lavadero
        ]
      },
      { path: 'estadisticas', component:  EstadisticasComponent, canActivate: [AuthGuard]}, // Ruta privada del lavadero
      { path: 'subscripcion', component: SubscripcionComponent, canActivate: [AuthGuard]}, // Ruta privada del lavadero
      { path: '**', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] } // Ruta privada del lavadero
    ]
  },
  { path: 'agradecimiento', component:  AgradecimientoComponent, canActivate: [RedireccionGuard] },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
