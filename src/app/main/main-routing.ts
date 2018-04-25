import { Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { CreatePostComponent } from './user/create-post/create-post.component';

import { AuthGuard } from './../guards/auth.guard';

export const mainRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'new-post', component: CreatePostComponent, canActivate: [AuthGuard] },
    { path: ':username', component: UserComponent },
    { path: ':username/:post_id', component: PostDetailsComponent }
];
