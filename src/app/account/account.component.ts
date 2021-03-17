import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import "reflect-metadata";
import {UserService} from "../services/user.service";
import {HttpClient, HttpHandler} from "@angular/common/http";

// https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
declare global{
	interface Window {
		googleSDKLoaded: any;
		gapi: any
  }
	
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  auth2: any;
  gapi: any;
 
  @ViewChild('loginRef', { static: true })
  loginElement!: ElementRef;
 
  constructor(private userService : UserService) { }
 
  ngOnInit(): void {
 
    this.googleSDK();
  }
 
  prepareLoginButton() {
 
    this.auth2.attachClickHandler (this.loginElement.nativeElement, {},
      (googleUser: any) => {
        let profile = googleUser.getBasicProfile ();
        var name = profile.getName ();
        var nameSplit = name.split (" ");
		    let emailInput = <HTMLInputElement> document.getElementById('emailAddress');
        emailInput.value = profile.getEmail();
        let logbtn = document.getElementById('loginBtn');
        if(logbtn != null){
        logbtn.innerText = 'Logged in with Google';
        }
        let fnameInput = <HTMLInputElement> document.getElementById('firstName');
        fnameInput.value = nameSplit[0];
        let lnameInput = <HTMLInputElement> document.getElementById('lastName');
        lnameInput.value = nameSplit [1];
        let profpic = <HTMLImageElement> document.getElementById('profilePic');
        profpic.src = profile.getImageUrl ();
        profpic.style.visibility = "visible";

        var data = {
          firstName: fnameInput.value, 
          lastName: lnameInput.value, 
          emailAddress : emailInput.value
        };
        this.userService.create (data).subscribe ();
 
      }, (error: any) => {
		let loginbtn = document.getElementById('loginBtn');
		if(loginbtn != null)
        loginbtn.innerHTML = 'Login Error';
        alert(JSON.stringify(error, undefined, 2));
      }); 
  }
  
  googleSDK() {
	let sdk : string = 'googleSDKLoaded';
    window['googleSDKLoaded'] = ( ) => {
     window['gapi'].load('auth2', () => {
		this.auth2 =  (window as any)['gapi'].auth2.init({
          client_id: '683748379823-4mjr3dhphc14q7e769lhpa9a1193b0nc.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }

    (function(d, s, id){
      let fjs = d.getElementsByTagName(s)[0];
      
      if (d.getElementById(id)) {return;}
      let js = <HTMLScriptElement> d.createElement(s); 
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      if(fjs.parentNode != null){
      fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'google-jssdk'));
 
  }
 
}
