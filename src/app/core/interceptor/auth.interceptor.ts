import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

const ROTA_PUBLICA: string = '/area-publica/';
const ROTA_AUTH: string = '/autenticacao';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    
    constructor(
        private readonly usuarioService: UsuarioService,
        private router: Router
    ){ }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        if(req.url.indexOf(ROTA_PUBLICA) < 0 && req.url.indexOf(ROTA_AUTH) < 0){
            if(this.usuarioService.isLogged()) {
                const token: string | null = this.usuarioService.getToken();
                if(token){
                    req = req.clone({
                        setHeaders: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                }
            }
        }
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
            }), catchError((error:HttpErrorResponse) => {
                if(error.status === 401){
                    this.usuarioService.logout();
                    this.router.navigate(['']);
                }

                return next.handle(req);
            })
        );
    }
}