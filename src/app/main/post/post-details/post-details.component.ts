import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { DataService } from './../../../services/data.service';
import { AuthService } from './../../../services/auth.service';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  private sessionUser;
  public post;
  private newComment;
  private updatedComment;
  private commentMode: string = 'view';

  private postSubscription;
  private paramSubscription;
  private commentSubscription;
  private isAuthenticated: Observable<boolean>;

  private userSubscription;

constructor(private authService: AuthService,private dataService: DataService, private progress: NgProgress, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.checkAuth();
    this.sessionUser = JSON.parse(sessionStorage.getItem('user'));
    this.paramSubscription = this.route.params.subscribe(params => {
      const idParameter = params['post_id'].split('-');
      const postId = idParameter[idParameter.length - 1];
      this.postSubscription = this.dataService.getPostDetail(postId).subscribe(response => {
          this.post = response['data'];
      });
    });

  }

  createComment(post_id, newComment: string){
    const sendNewComment = {
      text: newComment
    }
    this.commentSubscription = this.dataService.createComment(post_id, sendNewComment).subscribe(response => {
      this.toastr.success(response['message']);
      this.post.comments.push(response['data']);
    }, err => {
      this.toastr.error(err.error.message);
      this.progress.complete();
    }, () => {
      this.newComment = '';
      this.progress.complete();
    });
  }

  deleteComment(comment_id,post_id){
    this.commentSubscription = this.dataService.deleteComment(comment_id,post_id).subscribe(response=>{
      this.toastr.success(response['message']);
      this.post.comments = this.post.comments.filter(comment=>comment._id != comment_id);
    },err=>{
      this.toastr.error(err.error.message);
      this.progress.complete();
    },()=>{
      this.progress.complete();
    });
  }
  editComment(comment_id,post_id,updatedComment){
    const sendNewComment = {
      "text": updatedComment
    }
    this.commentSubscription = this.dataService.updateComment(comment_id,post_id,updatedComment).subscribe(response=>{
      this.toastr.success(response['message']);
      this.post.comments.forEach(comment=>{
        if(comment._id ==comment_id)
          comment.text = updatedComment;
      });
    },err=>{
      this.toastr.error(err.error.message);
      this.progress.complete();
    },()=>{
      this.progress.complete();
    });
  }

}
