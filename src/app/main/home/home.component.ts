import { Component, OnInit,OnDestroy } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public posts;
  //private userMenu: boolean = false;
  //private isAuthenticated: Observable<boolean>;
  private subscription;

  constructor(//private authService: AuthService,
  	private dataService: DataService) {}

  ngOnInit() {
      this.subscription = this.dataService.getHomePost().subscribe(response => {
        this.posts = response['data'];
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
