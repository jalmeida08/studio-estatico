import { Cliente } from "./cliente";
import { EstadoAtendimento } from "./enum/estado-atendimento";
import { Funcionario } from "./funcionario";
import { ProcedimentoAtendimento } from "./procedimento-atendimento";

export class AtendimentoHome {
    
    id!:string;
    cliente! : Cliente;
    funcionario! :Funcionario;
    valor!: string;
    desconto!:number;
    dataHoraAtendimento!: Date;
    dataHoraFimAtendimento!:Date;
    estadoAtendimento!: EstadoAtendimento;
    procedimentos = new Array<string|ProcedimentoAtendimento>();
}