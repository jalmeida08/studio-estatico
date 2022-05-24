import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { Mensagem, TipoMensagem } from "../../model/mensagem";
import { MensagemService } from "./mensagem-service";

@Component({
    selector: 'app-mensagem',
    templateUrl: './mensagem.component.html'
})
export class MensagemComponent implements OnInit, OnDestroy {
    
    destroy$: Subject<boolean> = new Subject<boolean>();
    @Input() timeout: number = 4000;
    mensagem: Array<Mensagem> = new Array<Mensagem>();

    constructor(private readonly mensagemService: MensagemService) {
        this.mensagemService
            .getMensagem()
            .pipe(takeUntil(this.destroy$))
            .subscribe( (mensagem:Mensagem | null) => {
                if(!mensagem){
                    this.mensagem = new Array<Mensagem>();
                    return;
                }
                this.mensagem.push(mensagem);
                setTimeout(() => { this.removeMensagem(mensagem)}, this.timeout);
            })
    }
    
    ngOnInit(): void {
    }
    
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    getMensagemClass(mensagem: Mensagem): string {
        if(!mensagem) return '';

        switch(mensagem.tipoMensagem){
            case TipoMensagem.SUCCESS:
                return 'alert alert-success';
            case TipoMensagem.WARNING:
                return 'alert alert-warning';
            case TipoMensagem.ERROR:
                return 'alert alert-danger';
            case TipoMensagem.INFO:
                return 'alert alert-info';
        }
    }

    removeMensagem(mensagemRemove: Mensagem): void {
        this.mensagem =  this.mensagem
            .filter((mensagem: Mensagem) => {
                    mensagem != mensagemRemove
            });
    }
} 