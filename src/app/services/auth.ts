import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // This matches the URL from your backend terminal
  private apiUrl = 'http://localhost:5001/api/auth';

  constructor(private http: HttpClient) { }

  // Sends the username and password to your backend
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        // If login is successful, save the token locally
        if (res.token) {
          localStorage.setItem('task_token', res.token);
        }
      })
    );
  }

  // Check if a token exists to see if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('task_token');
  }

  logout(): void {
    localStorage.removeItem('task_token');
  }
}