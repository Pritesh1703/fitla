import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(user): Observable<any> {
    return this.http.post('https://dbs-wellness-api.sit.apps.cs.sgp.dbs.com/api/auth', user);
  }

  public getAlluser(passcode): Observable<any> {
    console.log(JSON.stringify({ 'passcode': passcode }));
    const headers: HttpHeaders = new HttpHeaders()
      .set('content-type', 'application/json');
    return this.http.post('https://dbs-wellness-api.sit.apps.cs.sgp.dbs.com/api/users/all',
      JSON.stringify({ 'passcode': passcode }), { headers });
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

  }

}
