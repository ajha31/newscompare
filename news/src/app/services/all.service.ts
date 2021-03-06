import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {channels,news} from '../models/models'

@Injectable({
  providedIn: 'root'
})
export class AllService {
  url:string = 'http://localhost:3000';

  constructor(private http:HttpClient) { }
  
  getlibchan():Observable<channels[]>{
    return this.http.get<channels[]>(`channels/libral`);
  }
  getconchan():Observable<channels[]>{
    return this.http.get<channels[]>(`channels/conservative`)
  }
  getmodchan():Observable<channels[]>{
    return this.http.get<channels[]>(`channels/moderate`)
  }
  
  getnews(ch):Observable<news[]>{
    return this.http.get<news[]>(`all/${ch}`)
  }
  getsinglenews(ch,topic){
    return this.http.get<news[]>(`single/${ch}${topic}`)
  }
}
