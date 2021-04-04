import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import "reflect-metadata";
import {UserService} from "../../services/user.service";
var emailValidation = require ("email-validator");

declare global{
	interface Window {
		googleSDKLoaded: any;
		gapi: any
  }
}

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})

export class CreateAccountComponent implements OnInit {
  user = {
    firstName : '',
    lastName : '',
    emailAddress : ''
  };
  auth2: any;
  gapi: any;
 
  @ViewChild('loginRef', { static: true })
  loginElement!: ElementRef;
 
  constructor(private userService : UserService) { }
 
  ngOnInit(): void { 
    this.googleSDK();
  }
 
  clickCreateAccount () : void {
    let emailInput = <HTMLInputElement> document.getElementById('emailAddress');
    let fnameInput = <HTMLInputElement> document.getElementById('firstName');
    let lnameInput = <HTMLInputElement> document.getElementById('lastName');

    let emailError = document.getElementById('emailAddressErr');
    let fNameError = document.getElementById('firstNameErr');
    let lNameError = document.getElementById('lastNameErr');

    let emailVal = (emailInput.value != "");
    let lNameVal = (lnameInput.value != "");
    let fNameVal = (fnameInput.value != "");

    if (!emailVal) {        
      emailError.style.visibility = "visible";
    }
    else {
      let emailVal = emailValidation.validate (emailInput.value);
      var count = -1;

      //verify that the email address is not already in use.
      if (emailVal) {
        emailError.style.visibility = "hidden";
        this.userService.findByEmail (emailInput.value).subscribe (
          response => {
            count = Number (response.resultCount);
          });
      }
      else {
        emailError.textContent = "Please provide a valid email address";
        emailError.style.visibility = "visible";
      }
    }

    emailVal = (count == 0);
    if (!emailVal) {
      emailError.textContent = "Email address is already in use";
      emailError.style.visibility = "visible";
    }
    console.log (emailVal);

    if (!fNameVal) {        
      fNameError.style.visibility = "visible";
    }
    else {
      fNameError.style.visibility = "hidden";
    }

    if (!lNameVal) {        
      lNameError.style.visibility = "visible";
    }
    else {
      lNameError.style.visibility = "hidden";
    }

    let submit = fNameVal && lNameVal && emailVal;

    if (submit) {
      var data = {
        firstName: fnameInput.value, 
        lastName: lnameInput.value, 
        emailAddress : emailInput.value
      };

      this.userService.create (data).subscribe ();
    }
  }

  prepareLoginButton() : void {
 
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
      }, (error: any) => {
		let loginbtn = document.getElementById('loginBtn');
		if(loginbtn != null)
        loginbtn.innerHTML = 'Login Error';
        alert(JSON.stringify(error, undefined, 2));
      }); 
  }
  
  googleSDK() : void {
    window['googleSDKLoaded'] = ( ) => {
      window['gapi'].load('auth2', () => {
        this.auth2 =  (window as any)['gapi'].auth2.init({
          client_id: '947783139684-jpre9lhsk2g9r7g1b8v2dmr0th4lchs8.apps.googleusercontent.com',
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
