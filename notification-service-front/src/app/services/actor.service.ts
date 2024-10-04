import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Sector} from "../models/Sector";
import {Actor} from "../models/Actor";

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  api= "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getActors(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/users');
  }


  public saveActor (actor : Actor):Observable<Actor>{
    return this.http.post<Actor>(`${this.api}/api/users`, actor);
  }
}
