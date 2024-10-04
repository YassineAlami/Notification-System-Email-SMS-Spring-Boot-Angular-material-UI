import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Notification} from "../models/Notification";
import {Observable, of} from 'rxjs';
import {Delivery} from "../models/Delivery";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient : HttpClient) { }

  api= "http://localhost:8080";

  public saveNotification (notification : Notification):Observable<Notification>{
    return this.httpClient.post<Notification>(`${this.api}/api/notifications`, notification)
  }

  public getNotificationsFromDelivery (deliveryId : number):Observable<Notification[]>{
    return this.httpClient.get<any>(`http://localhost:8080/api/notifications/delivery/${deliveryId}`);
  }


  getNotificationsNumber(delivery: Delivery): number {
    // Check if delivery exists (optional)
    if (!delivery) {
      return 0;
    }

    return delivery?.notifications?.length || 0; // Use nullish coalescing operator
  }
}
