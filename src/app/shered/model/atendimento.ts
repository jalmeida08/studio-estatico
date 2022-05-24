import { EstadoAtendimento } from "./enum/estado-atendimento";

export class Atendimento {
    id!:string;
    idCliente! :string;
    idFuncionario!:string;
    valor!: string;
    desconto!:number;
    dataHoraAtendimento!: Date;
    dataHoraFimAtendimento!:Date;
    estadoAtendimento!: EstadoAtendimento;
    procedimentos = new Array<string>();
}