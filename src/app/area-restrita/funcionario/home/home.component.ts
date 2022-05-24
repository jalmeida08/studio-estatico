import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { PacoteAtendimento } from 'src/app/shered/component/lista-procedimentos/pacote-atendimento';
import { MensagemService } from 'src/app/shered/component/mensagem/mensagem-service';
import { ModalService } from 'src/app/shered/component/modal/modal.service';
import { AtendimentoHome } from 'src/app/shered/model/atendimento-home';
import { AtendimentoDetalhe } from 'src/app/shered/model/atendimentoDetalhe';
import { EditaAtendimentoForm } from 'src/app/shered/model/edita-atendimento-form';
import { ProcedimentoAtendimento } from 'src/app/shered/model/procedimento-atendimento';
import { ValidaAtendimento } from 'src/app/shered/model/valida-atendimento';
import { AtendimentoClient } from 'src/app/shered/service/client/atendimento.client';
import { ControleModaisBotaoes } from './controle-modais-botoes';
import * as moment from 'moment';
import { StringUtilService } from 'src/app/core/service/string-util.service';

@Component({
    selector: 'home-app',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    private $destroy = new Subject<boolean>();
    private diaSelecionado = new Date();
    private tipoAcao?: 'FINALIZAR'|'DESMARCAR'|'EDITAR'|'DETALHE';  
    private atendimentoEditado?: EditaAtendimentoForm;
    
    listaAtendimentoDia = new Array<AtendimentoHome>();
    listaProcedimentoEdita = new Array<ProcedimentoAtendimento>();
    idAtendimentoSelecionado!:string;
    atendimentoDetalhe = new AtendimentoDetalhe();
    atendimentoValidado = new ValidaAtendimento();
    clienteDetalheForm?: FormGroup;
    atendimentoEdicaoForm?: FormGroup;
    controleModaisBotoes!:ControleModaisBotaoes;
    textoModalConfirmacao = '';

    constructor(
        private atendimentoClient: AtendimentoClient,
        private mensagemService:MensagemService,
        private datePipe: DatePipe,
        private modalService:ModalService,
        private stringUtilService:StringUtilService
    ) { }
    
    ngOnInit() {
        this.controleModaisBotoes = new ControleModaisBotaoes(this.modalService);
        this.carregarAtendimentoDia(this.diaSelecionado);
        this.funcionalidadesBotaoHome();
    }

    ngOnDestroy(): void {
        this.$destroy.next(true);
        this.$destroy.unsubscribe();
    }

    getMask(tipo:'PERCENT'|'REAL') {
        if(tipo === 'PERCENT')
            return this.stringUtilService.percentualMask;
        if(tipo === 'REAL')
            return this.stringUtilService.valorMask;
        else return '';
    }

    recebeDiaSelecionadoEvent(diaSelecionado: Date) {
        this.limpar();
        this.diaSelecionado = diaSelecionado;
        this.carregarAtendimentoDia(diaSelecionado);
    }

    abrirModalConfirmacao(tipoAcao: 'FINALIZAR'|'DESMARCAR'|'EDITAR' ,idAtendimentoSelecionado:string){
        this.tipoAcao = tipoAcao;
        this.idAtendimentoSelecionado = idAtendimentoSelecionado;
        this.controleModaisBotoes.modalEventConfirmacao.next('OPEN');
        this.textoModalConfirmacao = `Deseja realmente ${tipoAcao.toLowerCase()} o atendimento?`;
    }
    
    removeProcedimento(p: ProcedimentoAtendimento) {
        if(this.listaProcedimentoEdita.length <= 1) {
            this.mensagemService.warning("Atendimento não pode ficar sem procedimento.");
            return;
        }

        let index = this.listaProcedimentoEdita.indexOf(p);
        this.listaProcedimentoEdita.splice(index, 1);
        this.efetuaCalculoAtendimento();
    }

    adicionaProcedimento() {
        this.controleModaisBotoes.inicializarProcedimentoSubject.next(true);
        this.controleModaisBotoes.modalEventEdicaoAtendimento.next('CLOSE');
        this.controleModaisBotoes.modalEventListaProcedimento.next('OPEN');
    }

    recebeProcedimentoSelecionado(pacoteAtendimento: PacoteAtendimento){
        // PacoteAtendimento
        this.controleModaisBotoes.modalEventListaProcedimento.next('CLOSE');
        this.controleModaisBotoes.modalEventEdicaoAtendimento.next('OPEN');
        if(this.atendimentoDetalhe.funcionario.id !== pacoteAtendimento.funcionario.id){
            let nomeFunci = this.atendimentoDetalhe.funcionario.nome;
            this.mensagemService.warning(`Nesse atendimento pode somente incluir procedimento realizado pela(o) ${nomeFunci}.`);
            this.mensagemService.info('Para realizar um procedimento de funcionário diferente, favor incluir outro atendimento.');
            return;
        }
        let p = new ProcedimentoAtendimento()
            .procedimentoToProcedimentoAtendimento(pacoteAtendimento.procedimento);
        this.listaProcedimentoEdita.push(p);
        this.efetuaCalculoAtendimento();        
    }

    efetuaCalculoAtendimento() {
        let valor = 0;
        let tempo = this.atendimentoEdicaoForm?.controls['dataHoraAtendimento'].value;
        this.listaProcedimentoEdita
            .forEach((item) => {
                valor += item.valor;
                tempo = moment(tempo).add(item.tempoDuracao, 'minute').toDate();
        });
        this.atendimentoEdicaoForm?.controls['valor'].setValue(valor);
        this.atendimentoEdicaoForm?.controls['fimAtendimento'].setValue(this.datePipe.transform(tempo, 'HH:mm'));
        this.calcularDesconto(valor);
    }
    
    private calcularDesconto(valorCalculado:number) {
        let valorComDesconto = 0;
        let valor = valorCalculado;
        let desconto = Number(this.atendimentoEdicaoForm?.controls['desconto'].value);
        if(valor >= 0 && desconto >= 0){
            valorComDesconto = valor - ((valor*desconto)/100);
            this.atendimentoEdicaoForm?.controls['valor'].setValue(valorComDesconto);
        } 

    }

    // FINALIZAR ATENDIMENTO
    finalizarAtendimento(idAtendimento:string) {
        this.atendimentoClient
            .finalizarAtendimento(idAtendimento)
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next:() => {
                    this.mensagemService.success('Atendimento finalizado com sucesso');
                    this.carregarAtendimentoDia(this.diaSelecionado);
                    this.limpar();
                }
            });
    }
    
    // DESMARCAR ATENDIMENTO
    desmarcaAtendimento(idAtendimento:string) {
        this.atendimentoClient
            .desmarcaAtendimento(idAtendimento)
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next:() => {
                    this.mensagemService.success('Atendimento Descarmado com sucesso');
                    this.carregarAtendimentoDia(this.diaSelecionado);
                    this.limpar();
                }
            });
    }
    
    selecionarAtendimento(idAtendimentoSelecionado:string) {
        this.tipoAcao = 'DETALHE';
        this.idAtendimentoSelecionado = idAtendimentoSelecionado;
        this.abriAtendimento(idAtendimentoSelecionado);
    }   
    
    habilitarEdicao(idAtendimentoSelecionado:string) {
        this.tipoAcao = 'EDITAR';
        this.controleModaisBotoes.modalEventEdicaoAtendimento.next('OPEN');
        this.abriAtendimento(idAtendimentoSelecionado);
    }
    
    private abriAtendimento(idAtendimento:string) {
        this.atendimentoClient
            .detalhaAtendimento(idAtendimento)
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (res:AtendimentoDetalhe) => {
                    this.atendimentoDetalhe = res;
                    if(this.tipoAcao === 'EDITAR'){
                        this.atendimentoEdicaoForm = this.montarClienteDetalheForm(res);
                        this.listaProcedimentoEdita = res.procedimentos.filter(item => item.id);
                    } else
                        this.clienteDetalheForm = this.montarClienteDetalheForm(res);                    
                },
                error: (err:HttpErrorResponse) => console.log(err),
            });
    }
    
    private efetivarConfirmacao() {
        this.controleModaisBotoes.modalEventConfirmacao.next('CLOSE');
        if(this.tipoAcao === 'FINALIZAR')
            this.finalizarAtendimento(this.idAtendimentoSelecionado);
        else if(this.tipoAcao === 'DESMARCAR')
            this.desmarcaAtendimento(this.idAtendimentoSelecionado);
        else if(this.tipoAcao === 'EDITAR')
            this.salvaEdicaoAtendimento();
        else 
            this.mensagemService.error('Tipo de ação não identificada, contacte o adimistrador do sistema');
    }
    
    private salvaEdicaoAtendimento() {
        this.atendimentoClient
            .editaAtendimento(this.atendimentoEditado!)
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (res:ValidaAtendimento) => {
                    this.mensagemService.success('Atendimento editado com sucesso.')
                    this.controleModaisBotoes.modalEventConfirmacao.next('CLOSE');
                    this.controleModaisBotoes.modalEventAlertaConflitoEdicao.next('CLOSE');
                    this.carregarAtendimentoDia(this.diaSelecionado);
                    this.limpar();
                },
                error:(err:HttpErrorResponse) => console.log(err)
            });
    }
    
    private funcionalidadesBotaoHome() {
        this.controleModaisBotoes.montarBotoesEAcoesModalProcedimento();
        this.controleModaisBotoes.montarBotoesEAcaoesModalConfirmacao(() => this.efetivarConfirmacao());
        this.controleModaisBotoes.montarBotoesEAcoesModalEdicao(() => this.validaEdicao());
        this.controleModaisBotoes.montarBotoesEAcoesModalConflitoEdicao(() => this.efetivarConfirmacao());
    }
    
    private carregarAtendimentoDia(data:Date) {
        if(data === null || data === undefined){
            this.mensagemService.warning('Selecione um dia para pesquisar');
            return;
        }
        let d = this.datePipe.transform(data, 'yyyy-MM-dd')
        this.atendimentoClient
            .listaAtendimentoDia(d?.toString())
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next:(res:AtendimentoHome[]) => {
                    this.listaAtendimentoDia = res;
                },
                error:(err: HttpErrorResponse) => console.error(err)
            });
    }

    private validaEdicao() {
        let id = this.atendimentoDetalhe.id;
        let desconto = this.atendimentoEdicaoForm?.controls['desconto'].value;
        let dataHoraAtendimento = this.atendimentoEdicaoForm?.controls['dataHoraAtendimento'].value;
        let lstProcedimentos = new Array<string>();
        this.listaProcedimentoEdita
            .forEach((i) => lstProcedimentos.push(i.id));
        this.atendimentoEditado = new EditaAtendimentoForm(id, desconto, dataHoraAtendimento, lstProcedimentos);

        this.atendimentoClient
            .validaEdicaoAtendimento(this.atendimentoEditado)
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (res:ValidaAtendimento) => {
                    this.atendimentoValidado = res;
                    if(res.listaAtendimentoConflitante.length > 0){
                        this.controleModaisBotoes.modalEventAlertaConflitoEdicao.next('OPEN');
                        this.controleModaisBotoes.modalEventEdicaoAtendimento.next('CLOSE');
                    }else{
                        this.controleModaisBotoes.modalEventEdicaoAtendimento.next('CLOSE');
                        this.abrirModalConfirmacao('EDITAR', this.atendimentoEditado!.id);
                    }
                },
                error:(err:HttpErrorResponse) => console.log(err)
            });
    }
    
    private montarClienteDetalheForm(a: AtendimentoDetalhe) {
        return new FormGroup({
            dataHoraAtendimento: new FormControl(a.dataHoraAtendimento, Validators.required),
            fimAtendimento: new FormControl(this.datePipe.transform(a.dataHoraFimAtendimento, 'HH:mm'), Validators.required),
            desconto: new FormControl(a.desconto, Validators.required),
            cliente: new FormControl(a.cliente.nome, Validators.required),
            valor: new FormControl(a.valor, Validators.required),
            funcionario: new FormControl(a.funcionario.nome, Validators.required),
        });
    }

    private limpar() {
        this.atendimentoEditado = undefined;
        this.listaProcedimentoEdita = new Array<ProcedimentoAtendimento>();
        this.idAtendimentoSelecionado = '';
        this.atendimentoDetalhe = new AtendimentoDetalhe();
        this.clienteDetalheForm = undefined;
        this.atendimentoEdicaoForm = undefined;
    }
}