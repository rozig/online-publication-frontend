import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';
import { NAuthGuard } from './guards/nauth.guard';

import { mainRoutes } from './main/main-routing';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NAuthGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', component: MainComponent, children: mainRoutes }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
