import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
 providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'http://localhost:3000/api/chats';
 constructor(private http: HttpClient, private router: Router,) { }



 login(userData: any): Observable<any> {
   return this.http.post<any>(`${this.apiUrl}/login`, userData,{ withCredentials: true})
     .pipe(
       catchError(error => {
         return throwError(error);
       })
     );
 }
 register(userData: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/register`, userData, { withCredentials: true })
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
}
getuser(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/alluser`, { withCredentials: true })
    .pipe(
      catchError(error => {
        console.error('Error in getuser:', error); // Log the error for debugging
        return throwError(error); // Rethrow the error to be caught by the subscriber
      })
    );
}
logout(): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/logout`,{}, { withCredentials: true })
    .pipe(
      catchError(error => {
        console.error('Error in logout:', error);
        return throwError(error);
      })
    );
}
isLoggedIn(): boolean {

  return !!localStorage.getItem('token') !
}
}
