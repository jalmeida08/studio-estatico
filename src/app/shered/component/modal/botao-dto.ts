import { Subject } from "rxjs";

export class BotaoDTO {
    nome!:string;
    classe = 'primary';
    acaoEnvetSubject!:Subject<any>;
    listaBota = new Array<this>();

    constructor(nome:string, classe:string, acaoEnvetSubject:Subject<any>){
        this.nome = nome;
        this.classe = classe;
        this.acaoEnvetSubject = acaoEnvetSubject;
    }

}