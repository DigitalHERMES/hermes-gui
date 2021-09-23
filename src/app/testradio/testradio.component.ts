import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { RadioService } from '../_services/radio.service';
import { NgForm } from '@angular/forms';
import {DecimalPipe} from '@angular/common';
//import { truncateSync } from 'fs';


//import { Router } from '@angular/router';
//import { GlobalConstants } from '../global-constants';


@Component({
  selector: 'app-testradio',
  templateUrl: './testradio.component.html',
  styleUrls: ['./testradio.component.less'],
  providers: [DecimalPipe],

})

export class TestradioComponent implements OnInit {
  radio: any = [];
  error: Error;
  alterFreq: boolean = false;
  alterSet: boolean = false;
  confirmSet: boolean = false;
  res: any;
  bfo: any;
  mastercal: any;
  freq: any;
  reseting: boolean = false;
  usb: boolean = true;
  mode: any;
  led: any;
  protection: any;
  bypass: any;
  public realValue : number;
  public min : number = 500000;
  public max : number = 300000000;
  errorAlert: boolean = false;
  radioError: boolean = false;

  constructor    ( 
	private apiService: ApiService,
	private radioService: RadioService,

	private decimalPipe: DecimalPipe) { }

  getRadioStatus(): void{
    this.radioService.getRadioStatus().subscribe(
      (res: any) => {
        this.radio= res;
        this.radio.extra=false;
        this.bfo = this.radio.bfo;
        this.mastercal = this.radio.mastercal;
        this.freq = this.radio.freq;
        this.mode = this.radio.mode;
        this.led = this.radio.led;
        this.protection = this.radio.protection;
        this.bypass = this.radio.bypass;
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
    if(this.realValue < this.min){
      this.realValue = undefined;
      setTimeout(() => {this.realValue = this.min;});
    }
    else if(this.realValue > this.max){
      this.realValue = undefined;
      setTimeout(() => {this.realValue = this.max;});
    }
  }

  changeCallback(f:NgForm){
    
  }

  changePtt(f:NgForm){
    
  }

  changeTheshold(f:NgForm) {

  }

  confirmReset() {
    if (this.reseting) {
      this.reseting = false;
    } else {
      this.reseting = true;
    }
    //console.log('⚚ radio-config - confirmReset: ', this.reseting);

  }

  resetRadio() {
    console.log('⚚ radio-config - reset to defaults ');
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
    this.radioService.setRadioFreq(f.value.freq).subscribe(
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
        console.log('⚚ changeFreqMode- setRadioMode: res: ', res);
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error =  err;
        this.errorAlert = true;
      }
    )

  }

  changeBfo(f:NgForm){
    this.radioService.setRadioBfo(f.value.mode).subscribe(
      (res: any) => {
        this.res = res;
        console.log('⚚ changeBfo- setRadioBfo: res: ', res);
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error = err;
        this.errorAlert = true;
      }
    )
  }

  changeMasterCall(f:NgForm){
    this.radioService.setRadioMastercal(f.value.mode).subscribe(
      (res: any) => {
        this.res = res;
        console.log('⚚ changeMastercall- setRadioMastercal: res: ', res);
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

resetProtection(f:NgForm) {
  this.radioService.radioReset().subscribe(
	  (res: any) => {
		this.res = res;
		console.log('⚚ radio config - reset radio: res: ', res);
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



  changeRadioSettings(f:NgForm){
    
    this.radioService.setRadioBfo(f.value.bfo).subscribe(
      (res: any) => {
        this.res = res;
        console.log('⚚ radio config changeRadioSettings - Bfo: res: ', res);
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error = err;
        this.errorAlert = true;
      }
    )

    this.radioService.setRadioMastercal(f.value.mastercal).subscribe(
      (res: any) => {
        this.res = res;
        console.log('⚚ radio config changeRadioSettings - mastercal: res: ', res);
        // this.fileIsProcessing = true;
      },
      (err) => {
        this.error =  err;
        this.errorAlert = true;
      }
    )
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

    if (this.radio.mode=="USB") {
      this.usb = true;
    } else {
      this.usb = false;
    }

    if (this.radio) {
      this.usb= this.radio.mode;
    }
     //console.log(this.usb)
  }

}
