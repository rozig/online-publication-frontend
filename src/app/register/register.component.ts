import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public model = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    profile_picture: null
  };
  public currentPicture;
  public password_repeat: string;
  public passwordError: boolean = false;
  private tmpProfile: string;
  public freeze: boolean = true;
  public profilePictureError: boolean = false;
  constructor(private authService: AuthService, private router: Router, private progress: NgProgress, private toastr: ToastrService) { }

  ngOnInit() {
    this.freeze = false;
  }

  updateImage(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (evt:any) => {
        this.tmpProfile = evt.target.result;
      }
      this.profilePictureError = false;
      this.currentPicture = evt.target.files[0];
      this.model['profile_picture'] = this.currentPicture;

      reader.readAsDataURL(evt.target.files[0]);
    }
  }

  checkPassword() {
    if(this.model.password !== this.password_repeat) {
      this.passwordError = true;
    } else {
      this.passwordError = false;
    }
  }

  onSubmit() {
    this.progress.start();
    this.freeze = true;

    if(!this.model['profile_picture']) {
      this.profilePictureError = true;
      this.progress.complete();
      this.freeze = false;
      return false;
    }

    if(this.model.password !== this.password_repeat) {
      this.toastr.error('Password doesn\'t match');
      this.progress.complete();
      this.freeze = false;
      return false;
    }

    const AWSService = AWS;
    const region = 'us-east-1';
    const bucketName = 'online-publication';
    const accessKeyId = 'AKIAIX5R6JCUZ2FSGL3A';
    const secretAccessKey = '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';
    const folderName = 'profile-pictures/';

    const bucket = new S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region
    });

    const params = {
      Bucket: bucketName,
      Key: folderName + this.currentPicture.name,
      Body: this.currentPicture,
      ACL: 'public-read',
      ContentType: this.currentPicture.type
    };

    bucket.upload(params, (err, data) => {
      if (err) {
        this.toastr.error(err.error.message);
        this.freeze = false;
        this.progress.complete();
      }
      this.model['profile_picture'] = data.Location;
      this.authService.register(this.model).subscribe(response => {
        localStorage.setItem('token', response.data);
        this.freeze = false;
      }, err => {
        this.toastr.error(err.error.message);
        this.freeze = false;
        this.progress.complete();
      }, () => {
        this.freeze = false;
        this.router.navigate(['/']);
        this.progress.complete();
      });
    });
  }
}
