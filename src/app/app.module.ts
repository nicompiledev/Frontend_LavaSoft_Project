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
import { LavaderoComponent } from './componentes/lavadero/lavadero.component';
import { ImagenesComponent } from './componentes/imagenes/imagenes.component';
import { RegistrarLavaderoComponent } from './componentes/admin/registrar-lavadero/registrar-lavadero.component';
import { FilterBasicComponent } from './componentes/usuario/catalogue/filter-basic/filter-basic.component';
import { FilterCompleteComponent } from './componentes/usuario/catalogue/filter-complete/filter-complete.component';
import { PreviewCarwashComponent } from './componentes/usuario/catalogue/preview-carwash/preview-carwash.component';
import { CatalogueComponent } from './componentes/views/catalogue/catalogue.component';
import { ReserveComponent } from './componentes/usuario/profile_carwash/reserve/reserve.component';
import { InformationComponent } from './componentes/usuario/profile_carwash/information/information.component';
import { DataProfileComponent } from './componentes/usuario/profile_carwash/data-profile/data-profile.component';
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
    LavaderoComponent,
    ImagenesComponent,
    RegistrarLavaderoComponent,
    FilterBasicComponent,
    FilterCompleteComponent,
    PreviewCarwashComponent,
    CatalogueComponent,
    ReserveComponent,
    InformationComponent,
    DataProfileComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
