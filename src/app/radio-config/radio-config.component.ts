import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { RadioService } from '../_services/radio.service';
import { NgForm } from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../user';

//import { truncateSync } from 'fs';


//import { Router } from '@angular/router';
//import { GlobalConstants } from '../global-constants';


@Component({
  selector: 'app-radio-config',
  templateUrl: './radio-config.component.html',
  styleUrls: ['./radio-config.component.less'],
  providers: [DecimalPipe],

})

export class RadioConfigComponent implements OnInit {
  public radio: any = [];
  error: Error;
  alterFreq: boolean = false;
  alterSet: boolean = false;
  confirmSet: boolean = false;
  res: any;
  ptt: any;
  bfo: any;
  mastercal: any;
  freq: any;
  frek: any;
  realfreq: any;
  reseting: boolean = false;
  usb: boolean = true;
  mode: any;
  led: any;
  protection: any;
  bypass: any;
  public realValue : number;
  public freqmin = 500;
  public freqmax =30000;
  errorAlert: boolean = false;
  radioError: boolean = false;
  testtone= '0';
  toneOn: boolean = false;
  currentUser: User;
  isAdmin = false;
  public min : number = 500000;
  public max : number = 300000000;
  

  constructor    (
	private apiService: ApiService,
  private authenticationService: AuthenticationService,
	private radioService: RadioService,
	private decimalPipe: DecimalPipe) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  getRadioStatus(): void{
    this.radioService.getRadioStatus().subscribe(
      (res: any) => {
        this.radio = res;
        this.radio.extra=false;
        this.bfo = this.radio.bfo;
        this.mastercal = this.radio.mastercal;
        this.freq = this.radio.freq;
        this.frek = this.radio.freq /1000;
        this.mode = this.radio.mode;
        this.led = this.radio.led;
        this.protection = this.radio.protection;
        this.bypass = this.radio.bypass;
  

        if (this.radio.bypass==true) {
          this.bypass = true;
        } else {
          this.bypass = false;
        }

        if (this.radio.tx) {
          this.ptt = 'ON';
        } else {
          this.ptt = 'OFF';
        }
		
        //console.log('hahah' + this.ptt);

        return res;
        
      },
      (err) => {
        this.error = err;
        this.radioError = true;
        console.log(this.error);
      }
    );
  }
  get value() : number {
    this.realValue = this.radio.freq;
    return this.realValue;
	}
  set value(newValue : number) {
    this.realValue = newValue;
    if(this.realValue < this.freqmin){
      this.realValue = undefined;
      setTimeout(() => {this.realValue = this.freqmin;});
    }
    else if(this.realValue > this.freqmax){
      this.realValue = undefined;
      setTimeout(() => {this.realValue = this.freqmax;});
    }
  }


  changePtt(f){
	  console.log (f);
    
    this.radioService.setRadioPTT(f).subscribe(
      (res: any) => {
        this.res = res;
        console.log('⚚ radio config - set ptt- : res: ', res);
        console.log (this.ptt);
        this.radio.ptt = res;
        this.ptt = f;
        if (this.ptt == "ON") {
          this.radio.tx = true;
          this.radio.rx = false;
        } else {
          this.radio.tx = false;
          this.radio.rx = true;
        }
                // this.fileIsProcessing = true;
      },
      (err) => {
       this.error = err;
        this.errorAlert = true;
      }
    )
  }

  changeCallback(){
    
  }

  confirmReset() {
    if (this.reseting) {
      this.reseting = false;
    } else {
      this.reseting = true;
    }
    //console.log('⚚ radio-config - confirmReset: ', this.reseting);

  }

  
  screenFreq():void {
    if (this.alterFreq == false) {
      this.alterFreq = true; 
    } else {
      this.alterFreq = false;
    }
  }



  
  changeRadioFreqMode(f:NgForm){
    this.radioService.setRadioFreq(f.value.freq).subscribe(
      (res: any) => {
        this.res = res;
		this.radio.freq = res;
        console.log('⚚ changeRadio- setRadioFreq: res: ', res);
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error =  err;
        this.errorAlert = true;
      }
    )

    this.radioService.setRadioMode(f.value.mode).subscribe(
      (res: any) => {
        this.res = res;
        console.log('⚚ changeFreqMode- setRadioMode: res: ', res);
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error =  err;
        this.errorAlert = true;
      }
    )

  }

  changeFrequency(f:NgForm) {
    let realfreq = f.value.frek * 1000;
	console.log(realfreq);
    this.radioService.setRadioFreq(realfreq).subscribe(
      (res: any) => {
        this.res = res;
        console.log('⚚ changeRadio- setRadioFreq: res: ', res);
        this.radio.freq = res;
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error = err;
        this.errorAlert = true;
      }
    )
    //filter if is number
    //filter range 
  }

  changeMode(f:NgForm) {
    this.radioService.setRadioMode(f.value.mode).subscribe(
      (res: any) => {
        this.res = res;
		this.radio.mode = res;
        //console.log('⚚ changeFreqMode- setRadioMode: res: ', res);
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error =  err;
        this.errorAlert = true;
      }
    )
  }

  changeBfo(f:NgForm){
    this.radioService.setRadioBfo(f.value.bfo).subscribe(
      (res: any) => {
        this.res = res;
		this.radio.bfo = res;
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error = err;
        this.errorAlert = true;
      }
    )
  }

  changeMasterCall(f:NgForm){
    this.radioService.setRadioMastercal(f.value.mastercal).subscribe(
      (res: any) => {
        this.res = res;
        console.log('⚚ changeMastercall- setRadioMastercal: res: ', res);
        this.radio.mastercal = res;
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error = err;
        this.errorAlert = true;
      }
    )
  }

  changeByPass(f:NgForm){
    this.radioService.setRadioBypass(f.value.bypass).subscribe(
      (res: any) => {
        this.res = res;
        //console.log('⚚ radio config - set bypass- : res: ', res);
		this.radio.bypass = res;
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error = err;
        this.errorAlert = true;
      }
    )
  }

  changeRefThreshold(f:NgForm){
    this.radioService.setRadioRefThreshold(f.value.refthreshold).subscribe(
      (res: any) => {
        this.res = res;
        //console.log('⚚ radio config - set bypass- : res: ', res);
		this.radio.refthreshold = res;
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error = err;
        this.errorAlert = true;
      }
    )
  }



  confirmChange(){
    if (this.confirmSet) {
      this.confirmSet = false;
    } else {
      this.confirmSet = true;
    }
  }

  screenSet() {
    if (this.alterSet == false) {
      this.alterSet = true; 
    } else {
      this.alterSet = false;
    }
    if (this.confirmSet) {
      this.confirmSet = false;
    } else {
      this.confirmSet = true;
    }
  }


  resetProtection() {
    console.log("teste");
    this.radioService.radioResetProtection().subscribe(
      (res: any) => {
      this.res = res;
      console.log('⚚ radio config - reset radio: res: ', res);
      if (this.res = 1) {
        this.radio.protection = false;
      } 
      // this.fileIsProcessing = true;
      },
      (err) => {
      this.error = err;
      this.errorAlert = true;
      }
    )
  
  }
  
  resetRadio() {
      console.log("reset");
    this.radioService.radioResetDefaults().subscribe(
      (res: any) => {
      this.res = res;
      console.log('⚚ radio reset: ', res);
      
      // this.fileIsProcessing = true;
      },
      (err) => {
      this.error = err;
      this.errorAlert = true;
      }
    )
  
      console.log('⚚ testradio - reset to defaults ');
    }

  

  closeError() {
    this.errorAlert = false;
  }

  submitSet() {
    if (this.confirmSet == false) {
      this.confirmSet = true; 
    } else {
      this.confirmSet = false;
    }
  }

  ngOnInit(): void {
     this.radio=this.getRadioStatus();

    if (this.radio) {
      this.usb= this.radio.mode;
    }

    if (this.currentUser) {
      this.isAdmin = this.currentUser.admin;
    } else {
      this.currentUser.admin = false;
    }
    console.log('ahahaha');

     console.log(this.isAdmin);
  }
}