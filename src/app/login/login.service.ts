import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(user): Observable<any> {
    return this.http.post('https://dbs-wellness-api.sit.apps.cs.sgp.dbs.com/api/auth', user);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): Observable<Object> {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token')
    });
    console.log(this.http.get('https://dbs-wellness-api.sit.apps.cs.sgp.dbs.com/api/users/isLogin', { headers: headers }));
    return this.http.get('https://dbs-wellness-api.sit.apps.cs.sgp.dbs.com/api/users/isLogin', { headers: headers });
    // return localStorage.getItem('token') ? true : false;
  }

}
