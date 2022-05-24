export class Procedimento {

    id!: string;
	nome!: string;
	valor!: number;
	tempoDuracao!: number;
	ativo!: boolean;
    funcionarios!:Array<string>;

    constructor() { }
}