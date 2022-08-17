import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post{
id: string;
title: string;
body: string
}
     
@Injectable({
  providedIn: 'root'
})
export class ApiService {
     
    _url = "https://jsonplaceholder.typicode.com/posts";
   
  constructor(private http: HttpClient) { }
     
  get(): Observable<any> {
    return this.http.get(`${this._url}`)
  }
     
  create(post:Post): Observable<any> {
    return this.http.post(`${this._url}`, {
      id: post.id,
      title: post.title,
      body: post.body
    })
  }      
  
  delete(id:number){
    return this.http.delete(`${this._url}/${id}`)
  }
    
}