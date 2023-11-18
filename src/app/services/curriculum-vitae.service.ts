import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, throwError } from 'rxjs';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CurriculumVitaeService {
  getAllCurriculumVitaeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cv/${id}`);
  }
  renameFile(id: number, newName: string) {
    return this.http.put(
      `${this.apiUrl}/cv/rename/${id}`,
      JSON.stringify(newName),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  deleteFileOfHumanResource(fileId: number) {
    return this.http.delete(`${this.apiUrl}/cv/${fileId}`);
  }
  deleleFileOfCustomer(customerId: number, cvId: number) {
    return this.http.delete(
      `${this.apiUrl}/cv/delete-usercv/${cvId}/${customerId}`
    );
  }
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllCurriculumVitae(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/cv`)
      .pipe(catchError(this.handleError));
  }
  uploadFiles(formData: FormData) {
    return this.http
      .post(`${this.apiUrl}/cv`, formData)
      .pipe(catchError(this.handleError));
  }
  getAllCurriculumVitaeOfCustomer(customerId: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/cv/customer/${customerId}`)
      .pipe(catchError(this.handleError));
  }

  sendCurriculumToCustomer(emailSendCVData: any) {
    return this.http
      .post(`${this.apiUrl}/mail/share`, emailSendCVData)
      .pipe(catchError(this.handleError));
  }
  viewFile(fileId: number) {
    return this.http.get(`${this.apiUrl}/cv/view/${fileId}`, {
      responseType: 'blob',
    });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
