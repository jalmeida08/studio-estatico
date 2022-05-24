import { Injectable } from '@angular/core';
import { AccessToken } from 'src/app/shered/model/access-token';

const TOKEN_KEY = 'accessToken';

@Injectable({providedIn: 'root'})
export class LocalStorageService {

    constructor() { }

    setToken(token: AccessToken): void {
        window.localStorage.setItem(TOKEN_KEY, token.access_token);
    }

    getToken(): string | null{
        const token: string | null = window.localStorage.getItem(TOKEN_KEY);
        return token;
    }
    
    hasToken(): boolean {
        if(this.getToken())
            return true;
        return false;
    }

    removerToken(){
        window.localStorage.removeItem(TOKEN_KEY);
    }
    
}