import { Injectable } from '@angular/core';
import { AccessToken } from 'src/app/shered/model/access-token';
import { LocalStorageService } from './local-storage.service';

@Injectable({providedIn: 'root'})
export class UsuarioService {

    constructor(private localStorageService: LocalStorageService) { }

    getToken(): string | null {
        if(this.localStorageService.hasToken())
            return this.localStorageService.getToken();
        return null;
    }

    isLogged(): boolean { 
        return this.localStorageService.hasToken();
    }

    setToken(token: AccessToken) {
        this.localStorageService.setToken(token);
    }
    
    logout() {
        this.localStorageService.removerToken();
    }
    
}