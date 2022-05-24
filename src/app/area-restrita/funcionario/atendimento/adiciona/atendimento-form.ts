import { EstadoAtendimento } from "src/app/shered/model/enum/estado-atendimento";

export class AtendimentoForm {

    idCliente! :string;
    idFuncionario!:string;
    valor!: string;
    desconto!:number;
    dataHoraAtendimento!: string;
    estadoAtendimento!: EstadoAtendimento;
    procedimentos = new Array<string>();

    constructor() {}
}