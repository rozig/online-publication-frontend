import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private model = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  };
  private password_repeat: string;
  private passwordError: boolean = false;
  private tmpProfile: string;
  private freeze: boolean = true;
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
    if(this.model.password !== this.password_repeat) {
      this.toastr.error('Password doesn\'t match');
      this.progress.complete();
      return false;
    }
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
  }
}
