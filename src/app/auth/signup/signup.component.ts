
import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
 selector: 'app-signup',
 templateUrl: './signup.component.html',
 styleUrls: ['./signup.component.css']
})
export class SignupComponent {


 signupForm= new FormGroup({
   username:new FormControl(''),
   email:new FormControl (''),
   password:new FormControl (''),
 
 })


 constructor(private formBuilder: FormBuilder,
   private router: Router,

   ) {}


 ngOnInit() {


   this.signupForm = this.formBuilder.group({
     username: ['', [Validators.required]],
     email: ['', [Validators.required,Validators.email]],
     password: ['', [Validators.required, Validators.minLength(6)]],
   




   });
 }


 signup() {
 

}


 get username() {
   return this.signupForm.get('username');
 }


 get email() {
   return this.signupForm.get('email');
 }
 get password() {
   return this.signupForm.get('password');
 }


}
