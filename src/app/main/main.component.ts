import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { DataService } from './../services/data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public user;
  public userMenu: boolean = false;
  public isAuthenticated: Observable<boolean>;
  private subscription;
  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.checkAuth();
    if(localStorage.getItem('token')) {
      this.subscription = this.dataService.getUser().subscribe(response => {
        this.user = response['data'];
        sessionStorage.setItem('user', JSON.stringify(this.user));
      });
    }
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
