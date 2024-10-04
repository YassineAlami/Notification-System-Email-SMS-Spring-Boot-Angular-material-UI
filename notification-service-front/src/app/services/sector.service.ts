import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Notification} from "../models/Notification";
import {Sector} from "../models/Sector";

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  api= "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getSectors(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/sectors');
  }

  public saveSector (sector : Sector):Observable<Sector>{
    return this.http.post<Sector>(`${this.api}/api/sectors`, sector);
  }
}
