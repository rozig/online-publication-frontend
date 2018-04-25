import { Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';

import { AuthGuard } from './../guards/auth.guard';

export const mainRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: ':username', component: UserComponent },
    { path: ':username/:post_id', component: PostDetailsComponent }
];
