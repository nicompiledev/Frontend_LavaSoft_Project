import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { RegistrarUsuarioComponent } from './componentes/usuario/registrar-usuario/registrar-usuario.component';
import { ConfirmarUsuarioComponent } from './componentes/usuario/confirmar-usuario/confirmar-usuario.component';
import { LoginUsuarioComponent } from './componentes/usuario/login-usuario/login-usuario.component';
import { RecuperarContrasenaUsuarioComponent } from './componentes/usuario/recuperar-contrasena-usuario/recuperar-contrasena-usuario.component';
import { NuevaContrasenaUsuarioComponent } from './componentes/usuario/nueva-contrasena-usuario/nueva-contrasena-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrarUsuarioComponent,
    ConfirmarUsuarioComponent,
    LoginUsuarioComponent,
    RecuperarContrasenaUsuarioComponent,
    NuevaContrasenaUsuarioComponent,
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
