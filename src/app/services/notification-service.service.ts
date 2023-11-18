import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllNotification(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notification`);
  }
  maskAllNotificaitonAsRead() {
    return this.http.post(`${this.apiUrl}/notification/mask-as-read`, null);
  }
  getAllUnreadNotification(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notification/unread`);
  }
}
