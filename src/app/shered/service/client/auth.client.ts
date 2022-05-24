import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/core/service/local-storage.service';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../../model/access-token';
import { Login } from '../../model/login';

@Injectable({providedIn: 'root'})
export class AuthClient {

    constructor(
        private http:HttpClient,
        private localStorage:LocalStorageService
    ){}

    login(dadosLogin: Login): Observable<any> {
        let params = new URLSearchParams();
        params.append('grant_type','password');
        params.append('scope','web');
        params.append('username',dadosLogin.email);
        params.append('password',dadosLogin.senha);

        let headers = new HttpHeaders({
            'Content-type': ['application/x-www-form-urlencoded'],
            'Authorization': ['Basic '+ btoa('clientapp:123456')],
        });

        return this
            .http.post<AccessToken>(
                `${environment.baseApi.AUTENTICACAO}/oauth/token`,
                params.toString(),
                {headers}
            ).pipe(tap( (res: AccessToken) => {
                this.localStorage.setToken(res);
            }));;
    }

    
}