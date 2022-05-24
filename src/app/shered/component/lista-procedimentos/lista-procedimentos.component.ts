import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Funcionario } from '../../model/funcionario';
import { Procedimento } from '../../model/procedimento';
import { DadosFuncionarioClient } from '../../service/client/dados-funcionario.client';
import { ProcedimentoClient } from '../../service/client/procedimento.client';
import { PacoteAtendimento } from './pacote-atendimento';

@Component({
    selector: 'lista-procedimento-app',
    templateUrl: './lista-procedimentos.component.html',
    styleUrls: ['lista-procedimento.component.scss']
})

export class ListaProcedimentoComponent implements OnInit, OnDestroy {

    @Output() enviaProcedimentoSelecionadoEvent = new EventEmitter();
    @Input() inicializarTelaSubject = new Subject<boolean>();
    private $destroy = new Subject<boolean>();
    private procedimentoSelecionado = new Procedimento();
    funcionario = new Funcionario();
    procedimento = new Procedimento();
    listaProcedimento = new Array<Procedimento>();
    listaFuncionario = new Array<Funcionario>();

    constructor(
        private procedimentoClient: ProcedimentoClient,
        private dadosFuncionarioClient: DadosFuncionarioClient
    ) { }
    
    ngOnInit() {
        this.inicializar();
    }

    ngOnDestroy(): void {
        this.$destroy.next(true);
        this.$destroy.unsubscribe();
    }
    
    private inicializar() {
        this.inicializarTelaSubject
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next:(res:boolean) =>{
                    console.log(res);
                    if(this.listaProcedimento.length === 0)
                        this.buscaListaProcedimento();
                    this.procedimento = new Procedimento();
                    this.listaFuncionario = new Array<Funcionario>();
                    this.funcionario = new Funcionario();
                }
            })
    }
    
    buscaDadosProfissional(procedimento:Procedimento){
        this.selecionaProcedimento(procedimento);
        this.dadosFuncionarioClient
            .consultaListaFuncionario(procedimento.funcionarios)
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (res:Funcionario[]) => this.listaFuncionario = res,
                error: (err:HttpErrorResponse) => console.error(err)
            });
    }
    
    private selecionaProcedimento(procedimento:Procedimento){
        this.procedimento = procedimento;
    }

    selecionaFuncionario(funcionario:Funcionario) {
        this.funcionario = funcionario;
    }
    
    addProcedimentoLista(){
        this.procedimentoSelecionado = this.procedimento; 
        this.enviaProcedimento();
        this.procedimentoSelecionado = new Procedimento();
    }
    
    private enviaProcedimento(){
        let pacoteProcedimento = 
            new PacoteAtendimento(this.procedimentoSelecionado, this.funcionario);

        this.enviaProcedimentoSelecionadoEvent.emit(pacoteProcedimento);
    }

    mostrarDuracao(tempo:number){
        if(tempo >= 60)
            return (tempo/60) + ' hrs';
        else return tempo + ' min.'
    }

    private buscaListaProcedimento() {
        this.procedimentoClient
            .listaProcedimentos()
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next:(res:Procedimento[]) => this.listaProcedimento = res,
                error:(err: HttpErrorResponse) => console.error(err)
            });
    }


}