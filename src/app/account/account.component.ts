import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
declare global{
	interface Window {
		MyNameSpace: any; 
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
 
  constructor() { }
 
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
          client_id: '754829809876-hnefv3gcbq3j9k35u9bq7a0irn3ef883.apps.googleusercontent.com',
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
