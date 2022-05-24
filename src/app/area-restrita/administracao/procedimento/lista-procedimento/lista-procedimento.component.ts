import { HttpResponseBase } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Procedimento } from 'src/app/shered/model/procedimento';
import { ProcedimentoDetalhe } from 'src/app/shered/model/procedimento-detalhe';
import { ProcedimentoClient } from 'src/app/shered/service/client/procedimento.client';

@Component({
    selector: 'lista-procedimento-app',
    templateUrl: './lista-procedimento.component.html'
})

export class ListaProcedimentoComponent implements OnInit, OnDestroy {

    private $destroy = new Subject<boolean>();
    listaProcedimento = new Array<Procedimento>();
    procedimentoSelecionado = new Procedimento();
    dadosProcedimento = new ProcedimentoDetalhe();

    constructor(
        private procedimentoClient:ProcedimentoClient,
        
    ) { }

    ngOnInit() {
        this.buscaProcedimento();
    }
    
    ngOnDestroy(){
        this.$destroy.next(true);
        this.$destroy.unsubscribe();
    }

    selecionarProcedimento(item:Procedimento) {
        this.procedimentoSelecionado = item;
        this.detalhaProcedimento(item.id);
    }
    
    private buscaProcedimento() {        
        this.procedimentoClient
            .listaProcedimentos()
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (res:Procedimento[]) => {
                    this.listaProcedimento = res;
                    console.log(res);
                },
                error: (err:HttpResponseBase) => console.error(err)
                
            })
    }

    private detalhaProcedimento(id:string){
        this.procedimentoClient
            .detalhaProcedimento(id)
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (res:ProcedimentoDetalhe) => {
                    this.dadosProcedimento = res
                },
                error: (err:HttpResponseBase) => console.error(err)
            })
    }

}