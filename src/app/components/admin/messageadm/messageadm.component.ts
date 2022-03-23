import { Component, OnInit } from '@angular/core';
import { Message } from '../../../interfaces/message';
import { User } from '../../../interfaces/user';
import { AuthenticationService } from '../../../_services/authentication.service';
import { MessageService } from '../../../_services/message.service';
import { AlertService } from '../../../_services/alert.service';
import { ApiService } from '../../../_services/api.service';
import { FormGroup } from '@angular/forms';
import { GlobalConstants } from '../../../global-constants';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';



@Component({
  selector: 'app-messageadm',
  templateUrl: './messageadm.component.html',
  styleUrls: ['./messageadm.component.less']
})
export class MessageadmComponent implements OnInit {

  currentUser: User;
  error = Error;
  success = '';
  test = '';
  messages: Message[];
  filteredMessages: Message[];
  message: Message;
  selectedMessages = false;
  isadmin = false;
  allowfile: any;
  allowhmp: any;
  serverConfig: any;
  allowUp: FormGroup;
  errorAlert = false;
  noSystem = false;
  isAdmin = false;
  cleaned = false;

  constructor(
    private messageService: MessageService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
    private http: HttpClient
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

      }

      getSysConfig(): void{
        this.apiService.getSysConfig().subscribe(
          (res: any) => {
            this.serverConfig = res;
            this.allowfile = res.allowfile;
            this.allowhmp = res.allowhmp;
            console.log(res);
            return res;
          },
          (err) => {
            this.error = err;
            this.noSystem = true;

          }
        );
      }
      
    closeError() {
        this.errorAlert = false;
      }

    loggedin() {
        if (this.isAdmin) {
          this.isAdmin = false;
        } else {
          this.isAdmin = true;
        }
      }

  confirmDelete() {
    if (this.selectedMessages) {
      this.selectedMessages = false;
    } else {
      this.selectedMessages = true;
    }
    console.log('⚚ messageadm - confirmDelete selectMessages');
  }





  cleanUp() {
    const url = `${GlobalConstants.apiURL}/api/file`; 
    console.log('allclean');
    this.cleaned = true;
    return this.http.delete(url);
    
  }

  getMessages(): void {
    this.messageService.getMessagesByType('inbox').subscribe(
      (res: any) => {
        this.messages = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  setUploadPermission(value: string) {
    // console.log(value);
      this.apiService.setFileConfig(value).subscribe(
      (res: any) => {
        this.allowfile = res.allowfile;
        console.log('⚚ messagecompose - sendMessage');
      },
      (err) => {
        this.error = err;
        this.errorAlert = true;
      }
    );
    // console.log(this.allowfile);
  }

  setComposePermission(value: string) {
    // console.log(value);
      this.apiService.setMsgConfig(value).subscribe(
      (res: any) => {
        this.allowfile = res.allowfile;
        console.log('⚚ messagecompose - sendMessage');
      },
      (err) => {
        this.error = err;
        this.errorAlert = true;
      }
    );
    // console.log(this.allowfile);
  }

  ngOnInit(): void {
    this.getMessages();
    this.getSysConfig();
    if (this.currentUser) {
      this.isAdmin = this.currentUser.admin;
    } else {
      this.isAdmin = false;
    }
  }



}
