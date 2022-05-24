import { Subject } from "rxjs";
import { BotaoDTO } from "src/app/shered/component/modal/botao-dto";
import { BotaoBuilder } from "src/app/shered/component/modal/botao.builder";
import { ModalService } from "src/app/shered/component/modal/modal.service";

export class ControleModaisAndBotoes {
    modalEventBuscaCliente = new Subject<'OPEN'|'CLOSE'>();
    modalEventAdicionaCliente = new Subject<'OPEN'|'CLOSE'>();
    modalEventAdicionaProcedimento = new Subject<'OPEN'|'CLOSE'>();
    modalEventConfirmacaoAtendimento = new Subject<'OPEN'|'CLOSE'>();

    botaoSalvarEventSubject = new Subject<boolean>();
    botaoFecharModalConfirmacaoSubject = new Subject<boolean>();
    botaoFecharModalAdicionaClienteSubject = new Subject<boolean>();
    botaoFecharModalBuscaClienteSubject = new Subject<boolean>();
    botaoFecharModalAdicionaProcedimentoSubject = new Subject<boolean>();

    listaBotaoModalConfirmacao = new Array<BotaoDTO>();
    listaBotaoAdicionaCliente = new Array<BotaoDTO>();
    listaBotaoBuscaCliente = new Array<BotaoDTO>();
    listaBotaoAdicionaProcedimento = new Array<BotaoDTO>();

    constructor(private modalService:ModalService){ }

    botaoAcaoModalConfirmacao(callBackFunctionSalvar:any, callBackFunctionFechar:any) {
        this.listaBotaoModalConfirmacao = new BotaoBuilder()
            .adicionaBota('Salvar', 'primary', this.botaoSalvarEventSubject)
            .adicionaBota('fechar', 'secondary', this.botaoFecharModalConfirmacaoSubject)
            .getListaBotao();
        this.modalService.acaoBotao(this.botaoFecharModalConfirmacaoSubject, () => callBackFunctionFechar());
        this.modalService.acaoBotao(this.botaoSalvarEventSubject, () => callBackFunctionSalvar());
    }

    botaoAcaoModalAdicionaCliente(callBackFunction:any) {
        this.listaBotaoAdicionaCliente = new BotaoBuilder()
            .adicionaBota('fechar', 'secondary', this.botaoFecharModalAdicionaClienteSubject)
            .getListaBotao();
        this.modalService.acaoBotao(this.botaoFecharModalAdicionaClienteSubject, () => callBackFunction());
    }

    botaoAcaoModalBuscaCliente(callBackFunction:any) {
        this.listaBotaoBuscaCliente = new BotaoBuilder()
            .adicionaBota('fechar', 'secondary', this.botaoFecharModalBuscaClienteSubject)
            .getListaBotao();
        this.modalService.acaoBotao(this.botaoFecharModalBuscaClienteSubject, () => callBackFunction());
    }

    botaoModalProcedimento(callBackFunction:any) {
        this.listaBotaoAdicionaProcedimento = new BotaoBuilder()
            .adicionaBota('fechar', 'secondary', this.botaoFecharModalAdicionaProcedimentoSubject)
            .getListaBotao();
        this.modalService.acaoBotao(this.botaoFecharModalAdicionaProcedimentoSubject ,() => callBackFunction());
    }
}