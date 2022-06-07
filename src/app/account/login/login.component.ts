import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AccountService, AuthConfirmation, AuthInfo } from 'src/app/services/account.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  
  private athenticateSubscription: Subscription|undefined = undefined;

  constructor(
    private accountService:AccountService,
    private cookiesService: CookiesService,
    private errorsService: ErrorsService,
    private router:Router,
  ) {
    this.loginForm = new FormGroup({
      'username' : new FormControl('', [Validators.required]),//, Validators.email
      'password' : new FormControl('', [Validators.required, Validators.minLength(4)]),
      'rememberMe' : new FormControl(false),
    });
   }

  ngOnInit(): void {}

  public onSubmit() :void {
    if(this.loginForm.valid) {
      let authInfo:AuthInfo = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      //Authenticate and set cookies
      this.athenticateSubscription = this.accountService.authenticate(authInfo).subscribe(
        (authConfirmation: AuthConfirmation) => {
          if(authConfirmation && authConfirmation.jwt) {
            this.cookiesService.setCookie(
              { 
                key : 'username',
                value : authConfirmation.username                
              }
            );
            this.cookiesService.setCookie(
              {
                key : 'jwt',
                value : authConfirmation.jwt
              }
            );

            this.errorsService.addError({
              code: 0,
              message: 'Logged In successfully.',
              timeActive: 10000
            });

            this.onLogIn(authConfirmation);
          }
          else {
            //Error
          }
        },
        (requestError:HttpErrorResponse) => {
          let error = requestError.error;
          error.timeActive = 5000;
          if(!error.message || error.message === '' || error.message === ' ') 
            error.message = "There was a problem Login in, please try again later."
          this.errorsService.addError(error);
        }
      );
    }
    else {
      this.errorsService.addError({
        code: 0,
        message: 'Please enter valid username and password.'
      });
    }
  }

  private onLogIn(auth:AuthConfirmation): void {
    this.accountService.loginEvent.emit(auth);
    this.router.navigate(['account','dashboard']);
  }

  ngOnDestroy(): void {
    if(this.athenticateSubscription) {
      this.athenticateSubscription?.unsubscribe();
    }
  }
}
