import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from './../../services/data.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private user;
  private posts;
  private paramSubscription;
  private userSubscription;
  private postsSubscription;
  private followSubscription;
  private tab: string = 'posts';
  private profilePicture: string;
  private tmpProfile: string;
  private mode: string = 'view';
  private fullname: string;
  private myself: boolean = false;
  private following: boolean = false;
  
  constructor(private dataService: DataService, private progress: NgProgress, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.progress.start();
    this.paramSubscription = this.route.params.subscribe(params => {
      const username = params['username'].split("@")[1];
      this.userSubscription = this.dataService.getUserByUsername(username).subscribe(response => {
        this.user = response['data'];
        this.fullname = `${this.user.firstname} ${this.user.lastname}`;
        const sessionUser = JSON.parse(sessionStorage.getItem('user'));
        if(sessionUser._id === this.user._id) {
          this.myself = true;
        } else {
          if(this.user.followers.indexOf(sessionUser._id) > -1) {
            this.following = true;
          }
        }
      }, err => {
        this.toastr.error(err.error.message);
        this.progress.complete();
      }, () => {
        this.progress.complete();
      });
      this.postsSubscription = this.dataService.getPostsByUser(username).subscribe(response => {
        this.posts = response['data'];
      }, err => {
        this.toastr.error(err.error.message);
        this.progress.complete();
      }, () => {
        this.progress.complete();
      });
    });
  }

  updateProfilePicture(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (evt:any) => {
        this.tmpProfile = evt.target.result;
      }

      reader.readAsDataURL(evt.target.files[0]);
    }
  }

  follow(userId: string) {
    this.followSubscription = this.dataService.followUser({following_user_id: userId}).subscribe(response => {
      const sessionUser = JSON.parse(sessionStorage.getItem('user'));
      if(response['data'] === 'follow') {
        sessionUser.following.push(userId);
        this.user.followers.push(userId);
        this.following = true;
      } else {
        sessionUser.following = sessionUser.following.filter(id => id != userId);
        this.user.followers = this.user.followers.filter(id => id != userId);
        this.following = false;
      }
      sessionStorage.setItem('user', JSON.stringify(sessionUser));
      this.toastr.success(response.message);
    }, err => {
      this.toastr.error(err.error.message);
      this.progress.complete();
    }, () => {
      this.progress.complete();
    });
  }

  ngOnDestroy() {
    if(this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if(this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if(this.followSubscription) {
      this.followSubscription.unsubscribe();
    }
  }

}
