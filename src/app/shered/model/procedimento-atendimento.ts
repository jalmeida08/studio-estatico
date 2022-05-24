import { Procedimento } from "./procedimento";

export class ProcedimentoAtendimento {

    id!: string;
	nome!: string;
	valor!: number;
	tempoDuracao!: number;
	ativo!: boolean;

    constructor() { }

	procedimentoToProcedimentoAtendimento(a:Procedimento):ProcedimentoAtendimento {
		this.id = a.id;
		this.nome = a.nome;
		this.valor = a.valor;
		this.ativo = a.ativo;
		this.tempoDuracao = a.tempoDuracao;
		return this;
	}
}