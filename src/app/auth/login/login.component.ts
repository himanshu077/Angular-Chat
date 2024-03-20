import { Emitters } from 'src/app/emitters/emitter';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message = '';

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.authService.getuser().subscribe({
      next: (res: any) => {
        console.log('Response:', res); // Log the response object
        this.message = `Hi  ${res.username} welcome to Login page `;
        Emitters.authEmitter.emit(true);
      },
      error: (err) => {
        console.error('Error:', err);
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      },
    });
  }
  login() {
    if (this.loginForm.valid) {
      const userData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.login(userData).subscribe({
        next: (response) => {
          console.log('login response:', response);
          localStorage.setItem("jwt",response.token)
          this.router.navigate(['/chats']);
        },
        error: (error) => {
          console.error('signup error:', error);
          if (error.status === 400) {
            console.log('Password is incorrect');
          } else {
            console.log("error");
            
          }
        },
      });
    } else {
      console.log('Form is not valid');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
