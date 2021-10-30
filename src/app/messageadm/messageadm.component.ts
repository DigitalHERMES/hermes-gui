import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { User } from '../user';
import { AuthenticationService } from '../_services/authentication.service';
import { MessageService } from '../_services/message.service';
import { AlertService } from '../alert.service';
import { ApiService } from '../_services/api.service';
import { FormGroup } from '@angular/forms';

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
  selectedMessages: boolean = false;
  isadmin = false;
  allowfile: any;
  serverConfig: any;
  allowUp: FormGroup;
  errorAlert: boolean = false;
  noSystem: boolean = false;
  isAdmin: boolean = false;

  constructor(private messageService: MessageService, private alertService: AlertService,
      private authenticationService: AuthenticationService,
      private apiService: ApiService
      ) { }

      getSysConfig(): void{
        this.apiService.getSysConfig().subscribe(
          (res: any) => {
            this.serverConfig= res;
            this.allowfile = res.allowfile;
            console.log(this.allowfile);
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
        if (this.isadmin) {
          this.isadmin = false;
        } else {
          this.isadmin = true;
        }
      }

  confirmDelete() {
    if (this.selectedMessages) {
      this.selectedMessages = false;
    } else {
      this.selectedMessages = true;
    }
    console.log('⚚ messageadm - confirmDelete selectMessages: ', this.selectedMessages);
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
    
    console.log(value);
      this.apiService.setSysConfig(value).subscribe(
      (res: any) => {
        this.allowfile= res.allowfile;
        console.log('⚚ messagecompose - sendMessage: res: ', res);
      },
      (err) => {
        this.error = err;
        this.errorAlert = true;
      }
    );
    console.log(this.allowfile);
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
