import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private model: object = {
    username: '',
    password: ''
  };
  private freeze: boolean = true;
  constructor(private authService: AuthService, private router: Router, private progress: NgProgress, private toastr: ToastrService) {}

  ngOnInit() {
    this.freeze = false;
  }

  onSubmit() {
    this.progress.start();
    this.freeze = true;
    this.authService.login(this.model).subscribe(response => {
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
