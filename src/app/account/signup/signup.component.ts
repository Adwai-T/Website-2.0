import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService, User } from 'src/app/services/account.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //Get--> email, name, password, birthdate, 

  //Give--> id-automatically-in-db, location-get-from-api, Authority

  
  public signUp:FormGroup;
  public calanderHeader = "Birthdate";

  constructor(
    private accountService:AccountService,
    private errorsService:ErrorsService,
    private cookiesService: CookiesService
  ) { 
    this.signUp = new FormGroup({
      'name' : new FormControl('', [Validators.required]),
      'email' : new FormControl('', Validators.required),
      'password' : new FormControl('', [Validators.required, Validators.minLength(5)]),
      'confirmPassword' : new FormControl('', [Validators.required, Validators.minLength(5)]),
      'birthDate' : new FormControl('', [Validators.required])
    });
  }

  public onSubmit() :void {
    let formValue = this.signUp.value;

    if(formValue.password !== formValue.confirmPassword) {
      this.errorsService.addError(
        { code: 0, message: 'Password and Confirm password do not match.'}
      );
      return;
    }

    if(this.signUp.valid) {
      let newUser:User = {
        alias: formValue.name,
        username: formValue.email,
        password: formValue.password,
      }
      this.accountService.createNewUser(newUser).subscribe(
        (user:User) => {
          this.errorsService.addError({ 
            code: 0, 
            message: 'User added Sucessfully, please login to continue.',
            timeActive: 20000,
          });          
        },

        (responseError: HttpErrorResponse) => {
          this.errorsService.addError(responseError.error);
        }
      );
    }
    else {
      this.errorsService.addError(
        { code: 0, message: 'Please fill all mandatory fields.' }
      );
    }
  }

  ngOnInit(): void {
  }

}
