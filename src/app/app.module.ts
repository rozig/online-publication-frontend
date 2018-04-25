import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';

import { MainModule } from './main/main.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { AuthGuard } from './guards/auth.guard';
import { NAuthGuard } from './guards/nauth.guard';

const config: object = {
  color: '#1abc9c',
  spinner: false
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgProgressModule.forRoot(config),
    ToastrModule.forRoot(),
    AppRoutingModule,

    MainModule
  ],
  providers: [
    AuthService,
    DataService,
    AuthGuard,
    NAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
