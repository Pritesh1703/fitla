import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public getregistrationDetails(registrationData): Observable<any> {
    return this.http.post('https://fierce-inlet-58861.herokuapp.com/api/users', registrationData);
  }
}

