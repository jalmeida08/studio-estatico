import { Subject } from "rxjs";
import { BotaoDTO } from "./botao-dto";

export class BotaoBuilder {
    private listaBotao = new Array<BotaoDTO>();

    adicionaBota(nome:string, classe:string, subject:Subject<any>){
        this.listaBotao.push(new BotaoDTO(nome, classe, subject));
        return this;
    }

    getListaBotao():Array<BotaoDTO> {
        return this.listaBotao;
    }
}