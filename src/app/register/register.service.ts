import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public getregistrationDetails(registrationData): Observable<any> {
    console.log('--------------', registrationData);
    return this.http.post('https://dbs-wellness-api.sit.apps.cs.sgp.dbs.com/api/users', registrationData);
  }
}

