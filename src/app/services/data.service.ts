import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  private BASE_URL = environment.apiUrl;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getUser() {
    const token = localStorage.getItem('token');
    if(token) {
      this.headers = this.headers.set('x-token', localStorage.getItem('token'));
    }
    return this.http.get(`${this.BASE_URL}/user`, { headers: this.headers });
  }

  createPost(payload: object): Observable<any> {
    const token = localStorage.getItem('token');
    if(token) {
      this.headers = this.headers.set('x-token', localStorage.getItem('token'));
    }
    return this.http.post(`${this.BASE_URL}/posts`, payload, { headers: this.headers });
  }

  getPostsByUser(username: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/posts/by-user/${username}`, { headers: this.headers });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/user/${username}`, { headers: this.headers });
  }

  followUser(payload): Observable<any> {
    const token = localStorage.getItem('token');
    if(token) {
      this.headers = this.headers.set('x-token', localStorage.getItem('token'));
    }
    return this.http.post(`${this.BASE_URL}/user/follow`, payload, { headers: this.headers });
  }
}
