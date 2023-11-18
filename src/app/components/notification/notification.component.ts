import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Notifications } from 'src/app/models/notification';
import { NotificationService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notifications: Notifications[] = [];
  private hubConnection!: signalR.HubConnection;
  constructor(private notificationService: NotificationService) {}
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7051/notificationhub')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
  ngOnInit(): void {
    this.viewAllNotification();
    this.startConnection();
    this.hubConnection.on('SendNotification', (message) => {
      this.viewAllNotification();
    });
  }
  viewAllNotification() {
    this.notificationService.getAllNotification().subscribe((response) => {
      this.notifications = response;
    });
  }
  viewAllUnreadNotification() {
    this.notificationService
      .getAllUnreadNotification()
      .subscribe((response) => {
        this.notifications = response;
      });
  }
  maskAllNotificaitonAsRead() {
    this.notificationService
      .maskAllNotificaitonAsRead()
      .subscribe((response) => {
        this.viewAllNotification();
      });
  }
}
