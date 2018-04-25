import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from './../../../services/data.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  private model: object = {
    title: '',
    body: '',
    draft: false
  };
  private freeze: boolean = false;
  constructor(private dataService: DataService, private progress: NgProgress, private toastr: ToastrService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  onSubmit() {
    this.progress.start();
    this.freeze = true;
    this.dataService.createPost(this.model).subscribe(data => {
      this.toastr.success('Post successfully created!');
    }, err => {
      this.toastr.error(err.error.message);
      this.freeze = false;
      this.progress.complete();
    }, () => {
      this.freeze = false;
      this.router.navigate(['/']);
      this.progress.complete();
    });
  }

}
