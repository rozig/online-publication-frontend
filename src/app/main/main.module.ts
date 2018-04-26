import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgProgressModule } from '@ngx-progressbar/core';
import { ToastrModule } from 'ngx-toastr';
import { NgStringPipesModule } from 'angular-pipes';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post/post.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ClickOutsideDirective } from './../directives/click-outside.directive';
import { CreatePostComponent } from './user/create-post/create-post.component';

const config: object = {
  color: '#1abc9c',
  spinner: false
};

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    PostComponent,
    PostDetailsComponent,
    UserComponent,
    ProfileComponent,
    ClickOutsideDirective,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgProgressModule.forRoot(config),
    ToastrModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgStringPipesModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
