import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AlertService } from '../alert.service';
import { Observable, throwError, of  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UUCPQueue} from '../uucpqueue';

import { GlobalConstants } from '../global-constants';

@Injectable({
  providedIn: 'root'
})
export class UUCPService{

  constructor(
      private http: HttpClient,
      private alertService: AlertService
  ) {}

    queue: UUCPQueue[];
    job: UUCPQueue;

    httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Disposition': 'multipart/form-data',
      })
    };

  getQueue(): Observable<UUCPQueue[]> {
    const url = `${GlobalConstants.apiURL}/sys/uuls`; 
    return this.http.get(url).pipe(
      map((res: any) => {
        this.queue= res;
        return this.queue;
    }),
      catchError(this.handleError));
  }

  cancelTransmission(uuhost, id): Observable<UUCPQueue[]> {
    const url = `${GlobalConstants.apiURL}/sys/uuk/${uuhost}/${id}`; // DELETE /message/42
    return this.http.delete(url).pipe(
      map((res: any) => {
        this.queue= res;
        console.log('⚚ uucp service - canceltransmission: ',res);
        return this.queue;
    }),
     catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
	  this.queue = [];
      console.log('⚚ Hermes ⚚\n⚚ uucp service  error - :\n ', error);
	  return throwError(error);
  }

}
