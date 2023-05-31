import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { RegistrarComponent } from './componentes/usuario/registrar/registrar.component';
import { ConfirmarCuentaComponent } from './componentes/usuario/confirmar-cuenta/confirmar-cuenta.component';
import { LoginComponent } from './componentes/usuario/login/login.component';
import { RecuperarContrasenaComponent } from './componentes/usuario/recuperar-contrasena/recuperar-contrasena.component';
import { NuevaContrasenaComponent } from './componentes/usuario/nueva-contrasena/nueva-contrasena.component';
import { PerfilComponent } from './componentes/usuario/perfil/perfil.component';
import { ActualizarPerfilComponent } from './componentes/usuario/actualizar-perfil/actualizar-perfil.component';
import { ActualizarPasswordComponent } from './componentes/usuario/actualizar-password/actualizar-password.component';
import { FilterBasicComponent } from './componentes/usuario/catalogue/filter-basic/filter-basic.component';
import { FilterCompleteComponent } from './componentes/usuario/catalogue/filter-complete/filter-complete.component';
import { PreviewCarwashComponent } from './componentes/usuario/catalogue/preview-carwash/preview-carwash.component';
import { CatalogueComponent } from './componentes/views/catalogue/catalogue.component';
import { ReserveComponent } from './componentes/usuario/profile_carwash/reserve/reserve.component';
import { InformationComponent } from './componentes/usuario/profile_carwash/information/information.component';
import { CarruselComponent } from './componentes/usuario/profile_carwash/carrusel/carrusel.component';
import { ProfileCarwashComponent } from './componentes/views/profile-carwash/profile-carwash.component';
import { ServicesCarwashComponent } from './componentes/usuario/profile_carwash/services-carwash/services-carwash.component';
import { HeaderComponent } from './componentes/principales/header/header.component';
import { FooterComponent } from './componentes/principales/footer/footer.component';
import { MainComponent } from './componentes/principales/main/main.component';
import { PrincipalComponent } from './componentes/views/principal/principal.component';
import { TestimonialsComponent } from './componentes/principales/testimonials/testimonials.component';
import { AboutComponent } from './componentes/principales/about/about.component';
import { SponsorsComponent } from './componentes/principales/sponsors/sponsors.component';
import { TeamComponent } from './componentes/principales/team/team.component';
import { LoadersComponent } from './componentes/principales/loaders/loaders.component';
import { CardsPacksComponent } from './componentes/lavaderos/cards-packs/cards-packs.component';
import { BenefitsComponentComponent } from './componentes/lavaderos/benefits-component/benefits-component.component';
import { WelcomeComponentComponent } from './componentes/lavaderos/welcome-component/welcome-component.component';
import { PerfilMenuComponent } from './componentes/principales/perfil-menu/perfil-menu.component';
import { CompaniesComponent } from './componentes/views/companies/companies.component';
import { RegisterCarwashComponent } from './componentes/lavaderos/register-carwash/register-carwash.component';

// Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// CHAT
import { ChatComponent } from './componentes/usuario/chat/chat.component';
import { ChatAdminComponent } from './componentes/admin/dashboard/chat-admin/chat-admin.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Dashboard
import { NavegacionComponent } from './componentes/admin/dashboard/navegacion/navegacion.component';
import { LavaderosPendientesComponent } from './componentes/admin/dashboard/lavaderos-pendientes/lavaderos-pendientes.component';

// Angular Material
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { LoginAdminComponent } from './componentes/admin/login-admin/login-admin.component';
import { ModalVehiclesComponent } from './componentes/usuario/modal-vehicles/modal-vehicles.component';
import { ReportesAdminComponent } from './componentes/admin/dashboard/reportes-admin/reportes-admin.component';
import { DataCarwashComponent } from './componentes/usuario/profile_carwash/data-carwash/data-carwash.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    ConfirmarCuentaComponent,
    LoginComponent,
    RecuperarContrasenaComponent,
    NuevaContrasenaComponent,
    PerfilComponent,
    ActualizarPerfilComponent,
    ActualizarPasswordComponent,
    FilterBasicComponent,
    FilterCompleteComponent,
    PreviewCarwashComponent,
    CatalogueComponent,
    ReserveComponent,
    InformationComponent,
    CarruselComponent,
    ProfileCarwashComponent,
    ServicesCarwashComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PrincipalComponent,
    TestimonialsComponent,
    AboutComponent,
    SponsorsComponent,
    TeamComponent,
    LoadersComponent,
    CardsPacksComponent,
    BenefitsComponentComponent,
    WelcomeComponentComponent,
    PerfilMenuComponent,
    CompaniesComponent,
    RegisterCarwashComponent,
    ChatComponent,
    ChatAdminComponent,
    NavegacionComponent,
    LavaderosPendientesComponent,
    LoginAdminComponent,
    ModalVehiclesComponent,
    ReportesAdminComponent,
    DataCarwashComponent,
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
