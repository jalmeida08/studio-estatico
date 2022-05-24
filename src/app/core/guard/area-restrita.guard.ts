import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../service/usuario.service';

@Injectable({providedIn: 'root'})
export class AreaRestritaGuard implements CanActivate {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if(!this.usuarioService.isLogged()){
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}