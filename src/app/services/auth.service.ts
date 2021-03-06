import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private BASE_URL = environment.apiUrl;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  login(payload: object): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/login`, payload, { headers: this.headers});
  }

  register(payload: object): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/register`, payload, { headers: this.headers});
  }

  checkAuth(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if(token) {
      this.headers = this.headers.set('x-token', token);
      return this.http.get<boolean>(`${this.BASE_URL}/auth/check-auth`, { headers: this.headers });
    } else {
      return Observable.of(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
    location.reload();
  }
}
