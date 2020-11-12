import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';


import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// configurar las rutas de la app
const routes: Routes = [

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  // {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  {path: '**', component: NopagefoundComponent},
];


//*[RouterModule.forRoot( routes ), para rutas principales *
@NgModule({
  imports: [RouterModule.forRoot( routes ),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

