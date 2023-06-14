import {Component, OnInit} from '@angular/core';
// import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  windowRef: any
  // constructor(private afAuth: AngularFireAuth) {
  // }

  // login() {
  //   const phoneNumber :number = 666638032;
  //
  //   this.afAuth.signInWithPhoneNumber(phoneNumber.toString(),this.windowRef.recaptchaVerefier).then(res=> {
  //     console.log(res)
  //   })
  // }

  ngOnInit(): void
  {
    // this.login();
  }

}
