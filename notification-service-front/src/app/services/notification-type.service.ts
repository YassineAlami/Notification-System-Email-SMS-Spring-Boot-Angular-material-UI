import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationTypeService {

  constructor(private http: HttpClient) { }

  getNotificationTypes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/notification-types');
  }
}
