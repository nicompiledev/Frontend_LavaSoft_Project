// Modulo principal de la aplicacion
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// Diseño
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';

// Formulario
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// componente pagina principal
import { MainComponent } from './componentes/anonimo/paginaPrincipal/main/main.component';
import { TestimonialsComponent } from './componentes/anonimo/paginaPrincipal/testimonials/testimonials.component';
import { AboutComponent } from './componentes/anonimo/paginaPrincipal/about/about.component';
import { SponsorsComponent } from './componentes/anonimo/paginaPrincipal/sponsors/sponsors.component';
import { TeamComponent } from './componentes/anonimo/paginaPrincipal/team/team.component';


// componentes anonimo
import { FilterBasicComponent } from './componentes/anonimo/catalogue/filter-basic/filter-basic.component';
import { FilterCompleteComponent } from './componentes/anonimo/catalogue/filter-complete/filter-complete.component';
import { PreviewCarwashComponent } from './componentes/anonimo/catalogue/preview-carwash/preview-carwash.component';
import { CatalogueComponent } from './componentes/views/catalogue/catalogue.component';
import { ReserveComponent } from './componentes/anonimo/profile_carwash/reserve/reserve.component';
import { InformationComponent } from './componentes/anonimo/profile_carwash/information/information.component';
import { CarruselComponent } from './componentes/anonimo/profile_carwash/carrusel/carrusel.component';
import { ProfileCarwashComponent } from './componentes/views/profile-carwash/profile-carwash.component';
import { ServicesCarwashComponent } from './componentes/anonimo/profile_carwash/services-carwash/services-carwash.component';
import { DataCarwashComponent } from './componentes/anonimo/profile_carwash/data-carwash/data-carwash.component';


// Principales
import { HeaderComponent } from './componentes/principales/header/header.component';
import { FooterComponent } from './componentes/principales/footer/footer.component';
import { LoadersComponent } from './componentes/principales/loaders/loaders.component';
import { PerfilMenuComponent } from './componentes/principales/perfil-menu/perfil-menu.component';
import { RegistrarComponent } from './componentes/principales/registrar/registrar.component';
import { LoginComponent } from './componentes/principales/login/login.component';

// USUARIO
import { ChatComponent } from './componentes/principales/chat/chat.component';
import { ConfirmarCuentaComponent } from './componentes/usuario/confirmar-cuenta/confirmar-cuenta.component';
import { RecuperarContrasenaComponent } from './componentes/usuario/recuperar-contrasena/recuperar-contrasena.component';
import { NuevaContrasenaComponent } from './componentes/usuario/nueva-contrasena/nueva-contrasena.component';
import { PerfilComponent } from './componentes/usuario/perfil/perfil.component';
import { ActualizarPerfilComponent } from './componentes/usuario/actualizar-perfil/actualizar-perfil.component';
import { ModalVehiclesComponent } from './componentes/usuario/modal-vehicles/modal-vehicles.component';
import { ReportesComponent } from './componentes/usuario/reportes/reportes.component';
import { PerfilUsuarioComponent } from './componentes/views/usuario/perfil-usuario/perfil-usuario.component';


// LAVADEROS
import { CardsPacksComponent } from './componentes/lavaderos/informacion-lavaderos/cards-packs/cards-packs.component';
import { BenefitsComponentComponent } from './componentes/lavaderos/informacion-lavaderos/benefits-component/benefits-component.component';
import { WelcomeComponentComponent } from './componentes/lavaderos/informacion-lavaderos/welcome-component/welcome-component.component';
import { RegisterCarwashComponent } from './componentes/lavaderos/register-carwash/register-carwash.component';
import { DashboardComponent } from './componentes/lavaderos/dashboard-Lavadero/dashboard/dashboard.component';
import { ReservasComponent } from './componentes/lavaderos/dashboard-Lavadero/reservas/reservas.component';
import { TableComponent } from './componentes/lavaderos/dashboard-Lavadero/tables/table/table.component';
import { DatepickerComponent } from './componentes/lavaderos/dashboard-Lavadero/datepicker/datepicker.component';

// Vistas
import { PrincipalComponent } from './componentes/views/principal/principal.component';
import { CompaniesComponent } from './componentes/views/companies/companies.component';

// Admin
import { ChatAdminComponent } from './componentes/admin/dashboard/chat-admin/chat-admin.component';
import { NavegacionComponent } from './componentes/admin/dashboard/navegacion/navegacion.component';
import { LavaderosPendientesComponent } from './componentes/admin/dashboard/lavaderos-pendientes/lavaderos-pendientes.component';
import { LoginAdminComponent } from './componentes/admin/login-admin/login-admin.component';
import { ReportesAdminComponent } from './componentes/admin/dashboard/reportes-admin/reportes-admin.component';
import { AceptarLavaderosComponent } from './componentes/admin/dashboard/aceptar-lavaderos/aceptar-lavaderos.component';
import { EditProfileCarwashComponent } from './componentes/lavaderos/edit-profile-carwash/edit-profile-carwash.component';
import { PendingTableComponent } from './componentes/lavaderos/dashboard-Lavadero/tables/pending-table/pending-table.component';
import { InProgressTableComponent } from './componentes/lavaderos/dashboard-Lavadero/tables/in-progress-table/in-progress-table.component';
import { CompletedTableComponent } from './componentes/lavaderos/dashboard-Lavadero/tables/completed-table/completed-table.component';
import { RegisterReserveComponent } from './componentes/lavaderos/register-reserve/register-reserve.component';
import { SubscripcionComponent } from './componentes/lavaderos/dashboard-Lavadero/subscripcion/subscripcion.component';
import { CancelarReservasComponent } from './componentes/lavaderos/dashboard-Lavadero/cancelar-reservas/cancelar-reservas.component';
import { AgradecimientoComponent } from './componentes/lavaderos/agradecimiento/agradecimiento.component';
import { AddEmployeeComponent } from './componentes/lavaderos/dashboard-Lavadero/tables/add-employee/add-employee.component';



@NgModule({
  declarations: [
    // Principales
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoadersComponent,
    PerfilMenuComponent,
    RegistrarComponent,
    LoginComponent,

    // Anonimo
    MainComponent,
    TestimonialsComponent,
    AboutComponent,
    SponsorsComponent,
    TeamComponent,
    FilterBasicComponent,
    FilterCompleteComponent,
    PreviewCarwashComponent,
    CatalogueComponent,
    ReserveComponent,
    InformationComponent,
    CarruselComponent,
    ProfileCarwashComponent,
    ServicesCarwashComponent,
    DataCarwashComponent,

    // Usuario
    ChatComponent,
    ConfirmarCuentaComponent,
    RecuperarContrasenaComponent,
    NuevaContrasenaComponent,
    PerfilComponent,
    ActualizarPerfilComponent,
    ModalVehiclesComponent,
    ReportesComponent,
    PerfilUsuarioComponent,

    // Lavaderos
    CardsPacksComponent,
    BenefitsComponentComponent,
    WelcomeComponentComponent,
    RegisterCarwashComponent,
    DashboardComponent,
    ReservasComponent,
    TableComponent,

    // Vistas
    PrincipalComponent,
    CompaniesComponent,

    // Admin
    ChatAdminComponent,
    NavegacionComponent,
    LavaderosPendientesComponent,
    LoginAdminComponent,
    ReportesAdminComponent,
    AceptarLavaderosComponent,
    EditProfileCarwashComponent,
    PendingTableComponent,
    InProgressTableComponent,
    CompletedTableComponent,
    RegisterReserveComponent,
    SubscripcionComponent,
    CancelarReservasComponent,
    AgradecimientoComponent
    AddEmployeeComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,
    BrowserAnimationsModule,
    FontAwesomeModule,

    // Angular Material
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
