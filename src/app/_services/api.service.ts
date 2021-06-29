import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AlertService } from '../alert.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Api } from '../api';
import { GlobalConstants } from '../global-constants';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  login = false;
  serverReturn: any;
  radioReturn: any;
  radioFrequency: any;
  radioMode: any;
  radioOffset: any;

  error = Error;

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }


    public getStatus(): Observable<{}> {
      const url = `${GlobalConstants.apiURL}/sys/status`; // get api:sys/status
      const output = this.http.get(url);
      return this.http.get(url).pipe(
        map((res: any) => {
          this.serverReturn = res;
          console.log('⚚ Hermes ⚚\n⚚ api service - system status:\n ', res);
          return this.serverReturn;
      }),
      catchError(this.handleError));
    }

    public getSysConfig(): Observable<{}> {
      const url = `${GlobalConstants.apiURL}/sys/config`; // get api:sys/status
      const output = this.http.get(url);
      return this.http.get(url).pipe(
        map((res: any) => {
          this.serverReturn = res;
          console.log('⚚ Hermes ⚚\n⚚ api service - system config:\n ', res);
          return this.serverReturn;
      }),
      catchError(this.handleError));
    }

    public setSysConfig(allowfile: string): Observable<{}> {
      var url = `${GlobalConstants.apiURL}/sys/config`; 
      return this.http.post(url,allowfile).pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
    }

    public getLogin(plogin, ppassword): Observable<{}> {
      const url = `${GlobalConstants.apiURL}/login`; // get api:sys/status
      const data =  {login: plogin, password: ppassword};
      return this.http.post(url, data[0]).pipe(
        map((res: any) => {
          this.serverReturn = res;
          return this.serverReturn;
        }),
        catchError(this.handleError)
        );
    }

    public setRadioFreq (freq: number): Observable<{}> {
      var url = `${GlobalConstants.apiURL}/radio/freq/${freq}`; 
      return this.http.post(url,null).pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
    }

    public setRadioMode (mode: string): Observable<{}> {
      var url = `${GlobalConstants.apiURL}/radio/mode/${mode}`; 
      return this.http.post(url,null).pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
    }

    public setRadioBfo (bfo: number): Observable<{}> {
      var url = `${GlobalConstants.apiURL}/radio/bfo/${bfo}`; 
      return this.http.post(url,null).pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
    }

    public setRadioMastercal(mastercal: number): Observable<{}> {
      var url = `${GlobalConstants.apiURL}/radio/mastercal/${mastercal}`; 
      return this.http.post(url,null).pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError));
    }

    public getRadioStatus(): Observable<{}> {
      const url = `${GlobalConstants.apiURL}/radio`; // get api:sys/status
      const output = this.http.get(url);
      return this.http.get(url).pipe(
        map((res: any) => {
          this.serverReturn= res;
          console.log('⚚ Hermes ⚚\n⚚ api service - radio status:\n ', res);
          return this.serverReturn;
      }),
      catchError(this.handleError));
    }

    public getRadioFrequency(): Observable<{}> {
      const url = `${GlobalConstants.apiURL}/radio/freq`; // get api:sys/status
      const output = this.http.get(url);
      return this.http.get(url).pipe(
        map((res: any) => {
          this.serverReturn = res;
          console.log('⚚ Hermes ⚚\n⚚ api service - radio status:\n ', res);
          return this.serverReturn;
      }),
      catchError(this.handleError));
    }

    public getRadioMode(): Observable<{}> {
      const url = `${GlobalConstants.apiURL}/radio/freq`; // get api:sys/status
      const output = this.http.get(url);
      return this.http.get(url).pipe(
        map((res: any) => {
          this.serverReturn = res;
          console.log('⚚ Hermes ⚚\n⚚ api service - radio status:\n ', res);
          return this.serverReturn;
      }),
      catchError(this.handleError));
    }


    public getRadioBfo(): Observable<{}> {
      const url = `${GlobalConstants.apiURL}/radio/bfo`; // get api:sys/status
      const output = this.http.get(url);
      return this.http.get(url).pipe(
        map((res: any) => {
          this.serverReturn = res;
          console.log('⚚ Hermes ⚚\n⚚ api service - radio status:\n ', res);
          return this.serverReturn;
      }),
      catchError(this.handleError));
    }


    private handleError(error: HttpErrorResponse) {
      console.log("⚚ api service - handleerror:", error);
      // return an observable with a user friendly message
      return throwError('⚚ api service Error! something went wrong: ');
    }

    private log(message: string) {
      this.alertService.add(`⚚ Api: ${message}`);
    }
}
