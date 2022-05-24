import { Funcionario } from "./funcionario";

export class ProcedimentoDetalhe {

    id!: string;
	nome!: string;
	valor!: number;
	tempoDuracao!: number;
	ativo!: boolean;
    funcionarios!:Array<Funcionario>;

    constructor() { }
}