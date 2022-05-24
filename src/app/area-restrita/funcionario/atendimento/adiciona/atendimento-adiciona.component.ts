import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PacoteAtendimento } from 'src/app/shered/component/lista-procedimentos/pacote-atendimento';
import { MensagemService } from 'src/app/shered/component/mensagem/mensagem-service';
import { ModalService } from 'src/app/shered/component/modal/modal.service';
import { AgendaDiaFuncionario } from 'src/app/shered/model/agenda-dia-funcionario';
import { Atendimento } from 'src/app/shered/model/atendimento';
import { Cliente } from 'src/app/shered/model/cliente';
import { EstadoAtendimento } from 'src/app/shered/model/enum/estado-atendimento';
import { Funcionario } from 'src/app/shered/model/funcionario';
import { Procedimento } from 'src/app/shered/model/procedimento';
import { ValidaAtendimento } from 'src/app/shered/model/valida-atendimento';
import { AtendimentoClient } from 'src/app/shered/service/client/atendimento.client';
import { ClienteClient } from 'src/app/shered/service/client/cliente.client';
import { AtendimentoForm } from './atendimento-form';
import { ControleModaisAndBotoes } from './controle-modais-botes';

declare const $: any;

@Component({
    templateUrl: 'atendimento-adiciona.component.html',
    styleUrls: ['./atendimento-adiciona.component.scss']
})
export class AtendimentoNovoComponent implements OnInit, OnDestroy {

    private $destroy = new Subject<boolean>();
    inicializarTelaListaProcedimentoSubject = new Subject<boolean>();

    cliente?: Cliente;
    atendimentoASerSalvo!: AtendimentoForm; 
    atendimentoForm = new AtendimentoForm();
    atendimentoValidado = new ValidaAtendimento();
    funcionarioAtendimento = new Funcionario();
    formAtendimento = new FormGroup({});
    formCliente = new FormGroup({});
    listaIdProcedimento = new Array<string>();
    listaAtendimentoDiaPesquisado?: Array<Atendimento>;
    listaCliente = new Array<Cliente>();
    listaPocedimentoSelecionado = new Array<Procedimento>();
    controleModaisAndBotoes!:ControleModaisAndBotoes;
    valorTotalAtendimento!:number;
    tempoTotalAtendimento!:number;
    totalComDesconto?:number;
    isShowBuscaCliente = false;
    isShowNovoCliente = false;
    monstrarSelect = false;
    
    constructor(
        private clienteClient: ClienteClient,
        private atendimentoClient: AtendimentoClient,
        private mensagemService:MensagemService,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        this.controleModaisAndBotoes = new ControleModaisAndBotoes(this.modalService);
        this.formAtendimento = this.montaFormAtendimento();
        this.construirBotoesEAcoes();
    }

    ngOnDestroy(): void {
        this.$destroy.next(true);
        this.$destroy.unsubscribe();
    }
    
    recebeDadosFormulario(cliente:Cliente) {        
        if(this.isShowBuscaCliente)
            this.buscaCliente(cliente);
        else 
            this.adicionaNovoCliente(cliente);
    }

    exibirTelaNovoCliente():void {
        this.controleModaisAndBotoes.modalEventAdicionaCliente.next('OPEN');
        this.formCliente = this.atualizaNovoClienteFormulario();
        this.isShowNovoCliente = true;
        this.isShowBuscaCliente = false;
    }

    exibirTelaBuscaCliente():void {
        this.formCliente = this.atualizaBuscaClienteFormulario();
        this.controleModaisAndBotoes.modalEventBuscaCliente.next('OPEN');
        this.isShowNovoCliente = false;
        this.isShowBuscaCliente = true;
    }
    
    exibirTelaProcedimento() {
        this.inicializarTelaListaProcedimentoSubject.next(true);
        this.controleModaisAndBotoes.modalEventAdicionaProcedimento.next('OPEN');
    }

    selecionaCliente(cliente:Cliente):void {
        this.cliente = cliente;
        this.atendimentoForm.idCliente = cliente.id;
        this.controleModaisAndBotoes.modalEventBuscaCliente.next('CLOSE');
    }

    recebeProcedimentoSelecionado(pacoteAtendimento:PacoteAtendimento) {
        this.controleModaisAndBotoes.modalEventAdicionaProcedimento.next('CLOSE');
        
        if(this.validaInclusaoDeUmNovoProcedimento(pacoteAtendimento)) {
            this.listaPocedimentoSelecionado.push(pacoteAtendimento.procedimento);
            this.funcionarioAtendimento = pacoteAtendimento.funcionario;
            this.atendimentoForm.idFuncionario = pacoteAtendimento.funcionario.id;
            
            this.listaIdProcedimento.push(pacoteAtendimento.procedimento.id);
            this.calcularTotalAtendimento();
        }
    }
    
    mostrarDuracao(tempo:number){
        let h = Math.floor(tempo / 60);
        let m = tempo % 60;  
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}` 
    }

    excluirAtendimento() {
        this.atendimentoForm = new AtendimentoForm();
        this.cliente = new Cliente();
        this.listaPocedimentoSelecionado = new Array<Procedimento>();
        this.funcionarioAtendimento = new Funcionario();
        this.listaAtendimentoDiaPesquisado = undefined;
    }
    
    buscaAgenda() {
        
        if(!this.atendimentoForm.idFuncionario ||
            this.atendimentoForm.idFuncionario.length <= 0 ||
            this.formAtendimento.controls['dataAtendimento'].value === null){
            this.mensagemService.info('Selecione um procedimento e uma data para poder buscar a agenda do profissional');
            return;
        }
        let agendaDiaFunci = new AgendaDiaFuncionario();
        agendaDiaFunci.dia = this.formAtendimento.controls['dataAtendimento'].value;
        agendaDiaFunci.id = this.atendimentoForm.idFuncionario;
        this.atendimentoClient
            .buscaAgendaDiaFuncionario(agendaDiaFunci)
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next:(res:Atendimento[]) => {
                    this.listaAtendimentoDiaPesquisado = new Array<Atendimento>();
                    this.listaAtendimentoDiaPesquisado = res;
                },
                error:(err:HttpErrorResponse) => console.error(err)                
            });
    }
    
    validaAtendimento() {
        if(!this.formAtendimento.valid || this.cliente === undefined || this.listaPocedimentoSelecionado.length === 0){
            this.mensagemService.warning('Fomulário inválido');
            return;
        }            

        this.atendimentoASerSalvo = new AtendimentoForm();        
        let hora = this.formAtendimento.controls['horaAtendimento'].value;
        let data =  this.formAtendimento.controls['dataAtendimento'].value;
        
        this.atendimentoASerSalvo.dataHoraAtendimento = data+"T"+hora;
        this.atendimentoASerSalvo.estadoAtendimento = EstadoAtendimento.AGENDADO;
        this.atendimentoASerSalvo.desconto = this.formAtendimento.controls['desconto'].value;
        this.atendimentoASerSalvo.idCliente = this.cliente.id;
        this.atendimentoASerSalvo.procedimentos = this.listaIdProcedimento;
        this.atendimentoASerSalvo.idFuncionario = this.funcionarioAtendimento.id;
        
        this.atendimentoClient
            .validaAtendimento(this.atendimentoASerSalvo)
            .pipe(takeUntil(this.$destroy))
                .subscribe({
                    next:(res:ValidaAtendimento) => {
                        this.atendimentoValidado = res;
                        this.controleModaisAndBotoes.modalEventConfirmacaoAtendimento.next('OPEN');
                    },
                    error:(err:HttpErrorResponse) => this.mensagemService.error(err.error.message)
                });
        
    }

    calcularTotalAtendimento() {
        this.valorTotalAtendimento = 0;
        this.tempoTotalAtendimento = 0;
        this.listaPocedimentoSelecionado.forEach((item) => {
            this.valorTotalAtendimento += item.valor;
            this.tempoTotalAtendimento += item.tempoDuracao
        });
        this.calcularDesconto();
    }
    
    calcularDesconto() {
        if(this.valorTotalAtendimento > 0 && Number(this.formAtendimento.controls['desconto'].value) > 0){
            let desconto = this.formAtendimento.controls['desconto'].value;
            this.totalComDesconto = this.valorTotalAtendimento - ((this.valorTotalAtendimento*desconto)/100);
        }else
            this.totalComDesconto = undefined;
    }
    
    private buscaCliente(cliente: Cliente) {
        this.clienteClient
        .buscaCliente(cliente)
        .pipe(takeUntil(this.$destroy))
        .subscribe({
            next: (res:Cliente[]) => this.listaCliente = res,
            error: (err:HttpErrorResponse) => console.error(err)
        });
    }
    
    private validaInclusaoDeUmNovoProcedimento(pacoteAtendimento:PacoteAtendimento): boolean {
        let formAtendimento = this.formAtendimento.value as Atendimento;
        
        if(this.atendimentoForm.idFuncionario !== undefined && this.atendimentoForm.idFuncionario !== pacoteAtendimento.funcionario.id && 
            (formAtendimento.dataHoraAtendimento === null || formAtendimento.estadoAtendimento === 0)
        ){
            this.mensagemService.info('Para incluir um procedimento de um funcionario diferente é necessário criar outro atendimento.');
            return false;
        }
        return true;
    }

    private adicionaNovoCliente(cliente:Cliente){
        this.controleModaisAndBotoes.modalEventAdicionaCliente.next('CLOSE');
        this.clienteClient
            .novoCliente(cliente)
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (res:Cliente) =>{
                    this.formCliente = this.atualizaNovoClienteFormulario();
                    this.cliente = res;
                }, 
                error: (err:HttpErrorResponse) => console.error(err)
            });
    }
    
    private salvarDadosAntedimento(atendimento:AtendimentoForm){
        this.controleModaisAndBotoes.modalEventConfirmacaoAtendimento.next('CLOSE');
        this.atendimentoClient
            .salvarAtendimento(atendimento)
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: () =>{
                    this.formAtendimento = this.montaFormAtendimento();
                    this.excluirAtendimento();
                    this.mensagemService.success('Atendimento registrado com sucesso!!!');
                }, 
                error: (err:HttpErrorResponse) =>{
                    this.mensagemService.error(err.error.message)
                }
            });
    }
    
    private atualizaNovoClienteFormulario():FormGroup {
        return new FormGroup({
            nome: new FormControl('', Validators.required),
            dataNascimento: new FormControl('', Validators.required)
        });
    }

    private atualizaBuscaClienteFormulario():FormGroup {
        return new FormGroup({
            nome: new FormControl(''),
            dataNascimento: new FormControl('')
        });
    }

    private montaFormAtendimento():FormGroup {
        return new FormGroup({
            estadoAtendimento: new FormControl(EstadoAtendimento.AGENDADO.valueOf(),Validators.required),
            dataAtendimento: new FormControl(null,Validators.required),
            horaAtendimento: new FormControl('',Validators.required),
            desconto: new FormControl(''),
        });
    }

    private construirBotoesEAcoes() {
        this.controleModaisAndBotoes.botaoAcaoModalBuscaCliente(
            () => this.controleModaisAndBotoes.modalEventBuscaCliente.next('CLOSE'));
        this.controleModaisAndBotoes.botaoAcaoModalConfirmacao(
            () => this.salvarDadosAntedimento(this.atendimentoASerSalvo),
            () => this.controleModaisAndBotoes.modalEventConfirmacaoAtendimento.next('CLOSE')
        );
        this.controleModaisAndBotoes.botaoAcaoModalAdicionaCliente(
            () => this.controleModaisAndBotoes.modalEventAdicionaCliente.next('CLOSE'));
        this.controleModaisAndBotoes.botaoModalProcedimento(
            () =>this.controleModaisAndBotoes.modalEventAdicionaProcedimento.next('CLOSE'));
    }
}