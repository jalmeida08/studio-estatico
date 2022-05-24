import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { MensagemService } from "src/app/shered/component/mensagem/mensagem-service";
import { Login } from "src/app/shered/model/login";
import { AuthClient } from "src/app/shered/service/client/auth.client";

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject<boolean>();
    formLogin = new FormGroup({});
    
    constructor(
        private authClient: AuthClient,
        private mensagemService: MensagemService
    ) {}
    
    ngOnInit(): void {
        this.formLogin = new FormGroup( {
            email: new FormControl('', Validators.required),
            senha: new FormControl('', Validators.required), 
        });
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    login():void {
        const dadosUsuario = this.formLogin.value as Login;
        this.authClient
            .login(dadosUsuario)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res: any) => console.log(res),
                error: (err: HttpErrorResponse) => this.mensagemService.error(err.error.error_description)
                    
            })
        
    }

}