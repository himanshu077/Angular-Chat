
import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
 selector: 'app-signup',
 templateUrl: './signup.component.html',
 styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
  }

  signup() {
    if (this.signupForm.valid) {
      const userData = {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('signup response:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('signup error:', error);
          if (error.status === 400) {
            console.log(
              'Username or email already exists. Please choose another one.'
            );
            console.log("user already exist");
            
          } else {
            console.log("signup failed");
            
          }
        },
      });
    } else {
      console.log('Form is not valid');
      // Handle the case where the form is not valid
    }
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
