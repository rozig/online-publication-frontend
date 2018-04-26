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

  getHomePost(){
    return this.http.get(`${this.BASE_URL}/posts`,{headers:this.headers});
  }

  getPostDetail(post_id){
    return this.http.get(`${this.BASE_URL}/posts/${post_id}`,{headers:this.headers});
  }

  deleteComment(comment_id,post_id){
  	const token = localStorage.getItem('token');
    if(token) {
      this.headers = this.headers.set('x-token', localStorage.getItem('token'));
    }
    console.log(`${this.BASE_URL}/comments/${comment_id}/post/${post_id}`);
  	return this.http.delete(`${this.BASE_URL}/comments/${comment_id}/post/${post_id}`,{headers:this.headers});
  }

  updateComment(comment_id,post_id,updatedComment){
  	const token = localStorage.getItem('token');
    if(token) {
      this.headers = this.headers.set('x-token', localStorage.getItem('token'));
    }
    console.log(`${this.BASE_URL}/comments/${comment_id}/post/${post_id}`);
  	return this.http.put(`${this.BASE_URL}/comments/${comment_id}/post/${post_id}`,updatedComment,{headers:this.headers});
  }

  createComment(post_id,newComment){
  	const token = localStorage.getItem('token');
    if(token) {
      this.headers = this.headers.set('x-token', localStorage.getItem('token'));
    }
  	return this.http.post(`${this.BASE_URL}/comments/post/${post_id}`,newComment,{headers:this.headers});
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

