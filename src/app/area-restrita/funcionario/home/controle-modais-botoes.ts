import { Subject } from "rxjs";
import { BotaoDTO } from "src/app/shered/component/modal/botao-dto";
import { BotaoBuilder } from "src/app/shered/component/modal/botao.builder";
import { ModalService } from "src/app/shered/component/modal/modal.service";

export class ControleModaisBotaoes {
    modalEventListaProcedimento = new Subject<'OPEN'|'CLOSE'>();
    modalEventConfirmacao = new Subject<'OPEN'|'CLOSE'>();
    modalEventEdicaoAtendimento = new Subject<'OPEN'|'CLOSE'>();
    modalEventAlertaConflitoEdicao = new Subject<'OPEN'|'CLOSE'>();
    
    listaBotoesModalProcedimento = new Array<BotaoDTO>();
    listaBotoesModalConfirmacao = new Array<BotaoDTO>();
    listaBotoesModalEdicao = new Array<BotaoDTO>();
    listaBotoesModalAlertaConflitoEdicao = new Array<BotaoDTO>();

    botaoFecharProcedimentoEventSubject = new Subject<boolean>();
    botaoFecharEdicaoEventSubject = new Subject<boolean>();
    botaoSimConfirmacaoEventSubject = new Subject<boolean>();
    botaoNaoConfirmacaoEventSubject = new Subject<boolean>();
    botaoSalvarEdicaoAtendimentoEventSubject = new Subject<boolean>();
    botaoEstouCienteAtendimentoConflitanteEventSubject = new Subject<boolean>();
    botaoVoltarAtendimentoConflitanteEventSubject = new Subject<boolean>();

    inicializarProcedimentoSubject = new Subject<boolean>();

    constructor(private modalService:ModalService){}
    

     // BOTÕES E AÇÕES TELA PROCEDIMENTO
    montarBotoesEAcoesModalProcedimento() {
        this.listaBotoesModalProcedimento = new BotaoBuilder()
            .adicionaBota('Fechar', 'secondary', this.botaoFecharProcedimentoEventSubject)
            .getListaBotao();

        this.modalService.acaoBotao(this.botaoFecharProcedimentoEventSubject, () => this.modalEventListaProcedimento.next("CLOSE"));
    }

    // BOTÕES E AÇÕES TELA CONFIRMAÇÃO
    montarBotoesEAcaoesModalConfirmacao(callBackFunction:any) {
        this.listaBotoesModalConfirmacao = new BotaoBuilder()
            .adicionaBota('Sim', 'primary', this.botaoSimConfirmacaoEventSubject)
            .adicionaBota('Não', 'secondary', this.botaoNaoConfirmacaoEventSubject)
            .getListaBotao();
        
        this.modalService.acaoBotao(this.botaoSimConfirmacaoEventSubject, () => callBackFunction());
        this.modalService.acaoBotao(this.botaoNaoConfirmacaoEventSubject, () => this.modalEventConfirmacao.next('CLOSE'));
    }

    // BOTÕES E AÇÕES TELA EDIÇÃO
    montarBotoesEAcoesModalEdicao(callBackFunction:any) {
        this.listaBotoesModalEdicao = new BotaoBuilder()
            .adicionaBota('Salvar', 'primary', this.botaoSalvarEdicaoAtendimentoEventSubject)
            .adicionaBota('Fechar', 'secondary', this.botaoFecharEdicaoEventSubject)
            .getListaBotao();
        this.modalService.acaoBotao(this.botaoSalvarEdicaoAtendimentoEventSubject, () => callBackFunction())
        this.modalService.acaoBotao(this.botaoFecharEdicaoEventSubject, () => {
            this.modalEventEdicaoAtendimento.next('CLOSE');
        });
    }

    montarBotoesEAcoesModalConflitoEdicao(callBackFunction:any) {
        this.listaBotoesModalAlertaConflitoEdicao = new BotaoBuilder()
            .adicionaBota('Estou ciente e confirmo', 'primary', this.botaoEstouCienteAtendimentoConflitanteEventSubject)
            .adicionaBota('Voltar', 'secondary', this.botaoVoltarAtendimentoConflitanteEventSubject)
            .getListaBotao();
        this.modalService.acaoBotao(this.botaoEstouCienteAtendimentoConflitanteEventSubject, () => callBackFunction())
        this.modalService.acaoBotao(this.botaoVoltarAtendimentoConflitanteEventSubject, () => {
            this.modalEventEdicaoAtendimento.next('OPEN');
            this.modalEventAlertaConflitoEdicao.next('CLOSE');
        });
    }
}