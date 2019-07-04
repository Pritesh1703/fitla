import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    allUsers: any;
    constructor(private http: HttpClient) { }
    public getAlluser(passcode): Observable<any> {
        console.log(JSON.stringify({ 'passcode': passcode }));
        const headers: HttpHeaders = new HttpHeaders()
            .set('content-type', 'application/json');
        this.allUsers = this.http.post('https://dbs-wellness-api.sit.apps.cs.sgp.dbs.com/api/users/all',
            JSON.stringify({ 'passcode': passcode }), { headers });
        return this.http.post('https://dbs-wellness-api.sit.apps.cs.sgp.dbs.com/api/users/all',
            JSON.stringify({ 'passcode': passcode }), { headers });
    }

}
