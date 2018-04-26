import { 
	Component, 
	OnInit,
	Input
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './../../../services/auth.service';
import { DataService } from './../../../services/data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  private post;
  private loggedUser;
  private postSubscription;
  private paramSubscription;
  private commentSubscription;
  private isAuthenticated: Observable<boolean>;
  
constructor(private authService: AuthService, 
    private dataService: DataService, private route: ActivatedRoute) {}
  
  this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
  console.log(this.loggedUser);

  ngOnInit() {
    this.isAuthenticated = this.authService.checkAuth();
      
    this.paramSubscription = this.route.params.subscribe(params => {
        this.postSubscription = this.dataService.getPostDetail(params['post_id']).subscribe(response => {
            this.post = response.data;
            console.log(this.post);
        });
    });

  }

}
