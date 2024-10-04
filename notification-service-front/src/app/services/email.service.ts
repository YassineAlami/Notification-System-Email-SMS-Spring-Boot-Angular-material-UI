import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Notification} from "../models/Notification";
import {EmailRequest} from "../models/EmailRequest";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://localhost:8080/api/emails';

  constructor(private http: HttpClient) {}

  sendEmail(emailRequest: EmailRequest): Observable<string> {
    const params = new HttpParams()
      .set('to', emailRequest.to)
      .set('subject', emailRequest.subject)
      .set('body', emailRequest.body);

    return this.http.post<string>(`${this.baseUrl}/sendEmail`, null, { params });
  }

}
