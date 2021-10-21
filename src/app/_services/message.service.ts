import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AlertService } from '../alert.service';
import { Observable, throwError, of  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Message } from '../message';

import { GlobalConstants } from '../global-constants';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
      private http: HttpClient,
      private alertService: AlertService
    ) { }

    messages: Message[];
    // message: Message[];
    message: any[];
    text: string;

    httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Disposition': 'multipart/form-data',
      })
    };

  postFile(file: any) {
    const url = `${GlobalConstants.apiURL}/file/`; // DELETE api/message/42
    // const  url = '//httpbin.org/post';

    const formData: FormData = new FormData();

    formData.append('name', 'teste');
    formData.append('fileup', file);

    const params = new HttpParams();
    const headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', 'multipart/form-data');
    // Authorization: 'my-auth-token'

    return this.http.post(url, formData, {params, headers})
    .pipe(
      map((res: any) => {
        this.messages = res;
        console.log('⚚ message service - postFile: ',res);
        return this.messages;
      }),
      catchError(this.handleError)
      );
  }

  getMessagesByType($type): Observable<Message[]> {
    const url = `${GlobalConstants.apiURL}/messages/${$type}`; // get api/messages/{inbox/outbox/draft}
    return this.http.get(url).pipe(
      map((res: any) => {
        this.messages = res;
        return this.messages;
    }),
      catchError(this.handleError));
  }

  getMessages(): Observable<Message[]> {
    const url = `${GlobalConstants.apiURL}/messages`; // get api/messages
    return this.http.get(url).pipe(
      map((res: any) => {
        this.messages = res;
        return this.messages;
    }),
      catchError(this.handleError));
  }

  getMessage(id: number): Observable<Message[]> {
    const url = `${GlobalConstants.apiURL}/message/${id}`; // get /message/42
    return this.http.get(url).pipe(
      map((res: any) => {
        this.message = res;
        return res;
    }),
      catchError(this.handleError));
  }

  getMessageImage(id: number): Observable<Blob> {
    const url = `${GlobalConstants.apiURL}/message/image/${id}`; // get /message/image/42
    console.log ('⚚ message service - getMessageImage: ' + url);
    return this.http.get(url, {responseType: 'blob'});
  }

  getInboxMessages(): Observable<Message[]> {
    const url = `${GlobalConstants.apiURL}/inbox`; // DELETE api/message/42
    return this.http.get(url).pipe(
      map((res: any) => {
        this.messages = res;
        console.log('⚚ message service - getInboxMessages: ', res);
        return this.messages;
    }),
      catchError(this.handleError));
  }

  getInboxMessage(id: number)  {
    const url = `${GlobalConstants.apiURL}/inbox/${id}`; // get /inbox/42
    return this.http.get(url).pipe(
      map((res: any) => {
        this.message = res.value;
        return res;
    }),
      catchError(this.handleError));
  }

  /** DELETE: delete the inbox message from the server */
  deleteInboxMessage(id): Observable<{}> {
    const url = `${GlobalConstants.apiURL}/inbox/${id}`; // DELETE /inbox/42
    return this.http.delete(url).pipe(
      map((res: any) => {
        console.log('⚚ message service - deleteInboxMessage: ',res);
        return this.messages;
    }),
     catchError(this.handleError));
  }

  /** DELETE: consume server to delete message  */
  deleteMessage(id): Observable<{}> {
    const url = `${GlobalConstants.apiURL}/message/${id}`; // DELETE /message/42
    return this.http.delete(url).pipe(
      map((res: any) => {
        console.log('⚚ message service - deleteMessage: ',res);
        return this.messages;
    }),
     catchError(this.handleError));
  }


   //uncrypt message test by ariane
   uncrypt(id:number, values): Observable<{}> {
    var url = `${GlobalConstants.apiURL}/inbox/uncrypt/${id}`; 
    return this.http.post<Message>(url, values).pipe(
      map((res: any) => {
        this.text = res;
        return this.text;
    }),
     catchError(this.handleError));
  }


  // POST: add a new message to the database
  sendMessage(message: Message, file, id, cs_origin): Observable<Message[]> {
    const url = `${GlobalConstants.apiURL}/message`; // POST /message
    message.draft = false;
    message.sent_at = Date();
    message.orig = cs_origin;  
    // messageImage: File;

    if (id){
      message.id = id;
      message.file = file;
    }
    console.log('⚚ message service - sendMessage: ', message);

    return this.http.post<Message>(url, message).pipe(
      map((res: any) => {
        this.message = res;
        return this.message;
    }),
      catchError(this.handleError),
    );
}

/** POST: update a message  */
  updateMessage(message: Message): Observable<Message> {
    const url = `${GlobalConstants.apiURL}/message/${message.id}`; // PUT api/message/42
    return this.http.post<Message>(url, message, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

  private handleError(error: HttpErrorResponse) {
    this.message = [];
	console.log('⚚ Hermes ⚚\n⚚ message service  error - :\n ', error);
	return throwError(error);
  }
}

