import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../Models/login-request';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginRequest: LoginRequest = new LoginRequest;

  readonly apiUrl = "http://localhost:3004/api/";

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  iniciarSesion()
  {
    return this.http.post(this.apiUrl + 'login', this.loginRequest);
  }

  setUser(username: string)
  {
    this.cookieService.set('username', username);
  }

  getUserLogged()
  {
    return this.cookieService.get('username');
  }

  logout()
  {
    return this.cookieService.delete('username');
  }
}
