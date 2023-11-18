import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, AccountRegister } from '../models/account';
import { environment } from 'src/enviroment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  resetPassword(resetPasswordObj: any) {
    return this.http.post(`${this.apiUrl}/resetpassword`, resetPasswordObj);
  }
  logout() {
    localStorage.clear();
  }
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(account: Account): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, account);
  }

  getAllCustomer(): Observable<any> {
    return this.http.get(`${this.apiUrl}/account`);
  }
  getAllHumanResource(): Observable<any> {
    return this.http.get(`${this.apiUrl}/account/hr`);
  }
  getAllValidHumanResource(): Observable<any> {
    return this.http.get(`${this.apiUrl}/account/valid-hr`);
  }
  getAllCustomerOfHumanResouce(): Observable<any> {
    return this.http.get(`${this.apiUrl}/account/customer`);
  }
  getDetailOfHumanResource(hrId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/account/hr/${hrId}`);
  }
  getAccountById(accoutnId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/account/${accoutnId}`);
  }
  assignCustomerToHumanResource(assingData: any) {
    return this.http.post(`${this.apiUrl}/account/assign`, assingData);
  }
  lockAndUnlockAccount(id: number) {
    return this.http.post(`${this.apiUrl}/account/lock-unlock/${id}`, null);
  }
  registerAccount(account: AccountRegister) {
    return this.http.post(`${this.apiUrl}/register`, account);
  }

  deleteCustomerOfHr(hrId: number, customerId: number) {
    return this.http.delete(
      `${this.apiUrl}/account/delete-customer/${hrId}/${customerId}`
    );
  }
  sendOtp(email: string) {
    return this.http.post(`${this.apiUrl}/otp/send?email=${email}`, null);
  }
  validateOtp(otp: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/otp/validate`, otp).pipe();
  }
}
