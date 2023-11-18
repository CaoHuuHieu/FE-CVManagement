import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
}
