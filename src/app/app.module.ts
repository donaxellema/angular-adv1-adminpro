import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Modulo de importancia */
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';


import { AppComponent } from './app.component';
/*import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';*/
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


@NgModule({
  declarations: [
    AppComponent,
    
    NopagefoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
    /*Todos los modulos van en los imports */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
