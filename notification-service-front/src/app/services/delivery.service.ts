import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Delivery} from "../models/Delivery";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<any[]>('http://localhost:8080/api/deliveries');
  }

  getAvailableDeliveries(): Observable<Delivery[]> {
    return this.http.get<any[]>('http://localhost:8080/api/deliveries/pendingOrNoState');
  }

  getDeliveriesById(id : number): Observable<Delivery> {
    return this.http.get<any>(`http://localhost:8080/api/deliveries/${id}`);
  }


}
