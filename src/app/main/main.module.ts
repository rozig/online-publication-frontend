import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post/post.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    PostComponent,
    PostDetailsComponent,
    UserComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
