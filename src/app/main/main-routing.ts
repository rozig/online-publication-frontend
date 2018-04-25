import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';

import { AuthGuard } from './../guards/auth.guard';

export const mainRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: ':username',
        component: UserComponent,
        children: [
            { path: '', component: ProfileComponent },
            { path: ':post_id', component: PostDetailsComponent }
        ]
    }
];
