import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
 
  auth2: any;
  gapi: any;
 
  @ViewChild('loginRef', { static: true })
  loginElement!: ElementRef;
 
  constructor() { }
 
  ngOnInit() {
 
    this.googleSDK();
  }
 
  prepareLoginButton() {
 
    this.auth2.attachClickHandler (this.loginElement.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile ();
        var name = profile.getName ();
        var nameSplit = name.split (" ");

        document.getElementById ('emailAddress').value = profile.getEmail();
        document.getElementById ('loginBtn').innerHTML = 'Logged in with Google';
        document.getElementById ('firstName').value = nameSplit [0];
        document.getElementById ('lastName').value = nameSplit [1];
        document.getElementById ('profilePic').src = profile.getImageUrl ();
        document.getElementById ('profilePic').style.visibility = "visible";
 
      }, (error) => {
        document.getElementById ('loginBtn').innerHTML = 'Login Error';
        alert(JSON.stringify(error, undefined, 2));
      }); 
  }
  
  googleSDK() {
    window['googleSDKLoaded'] = () => {
      this.gapi = window['gapi'];
      this.gapi.load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '754829809876-hnefv3gcbq3j9k35u9bq7a0irn3ef883.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); 
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
 
  }
 
}