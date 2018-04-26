import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

import { DataService } from './../../../services/data.service';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  private model: object = {
    title: '',
    body: '',
    image: '',
    draft: false
  };
  private currentImage;
  private tmpImage: string;
  private freeze: boolean = false;
  constructor(private dataService: DataService, private progress: NgProgress, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  updatePostImage(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (evt:any) => {
        this.tmpImage = evt.target.result;
      }
      this.currentImage = evt.target.files[0];
      this.model['image'] = this.currentImage;

      reader.readAsDataURL(evt.target.files[0]);
    }
  }

  onSubmit() {
    this.progress.start();
    this.freeze = true;
    const AWSService = AWS;
    const region = 'us-east-1';
    const bucketName = 'online-publication';
    const accessKeyId = 'AKIAIX5R6JCUZ2FSGL3A';
    const secretAccessKey = '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';
    const folderName = 'post-images/';

    const bucket = new S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region
    });

    const params = {
      Bucket: bucketName,
      Key: folderName + this.currentImage.name,
      Body: this.currentImage,
      ACL: 'public-read',
      ContentType: this.currentImage.type
    };

    bucket.upload(params, (err, data) => {
      if (err) {
        this.toastr.error(err.error.message);
        this.freeze = false;
        this.progress.complete();
      }
      this.model['image'] = data.Location;
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
    });
  }

  uploadToS3(type, file) {
    const AWSService = AWS;
    const region = 'us-east-1';
    const bucketName = 'online-publication';
    const accessKeyId = 'AKIAIX5R6JCUZ2FSGL3A';
    const secretAccessKey = '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';
    let folderName = '';

    if(type == 'post') {
      folderName = 'post-images/';
    } else if(type == 'user') {
      folderName = 'profile-images/';
    }

    const bucket = new S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region
    });

    const params = {
      Bucket: bucketName,
      Key: folderName + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type
    };

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      return data;
    });
  }
}
