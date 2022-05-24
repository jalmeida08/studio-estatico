export class EditaAtendimentoForm {
    id!: string;
    desconto!:number;
    dataHoraAtendimento!: Date;
    procedimentos = new Array<string>();

    constructor( id: string,
        desconto:number,
        dataHoraAtendimento: Date,
        procedimentos: Array<string>
    ){
        this.id = id;
        this.desconto = desconto;
        this.dataHoraAtendimento = dataHoraAtendimento;
        this.procedimentos = procedimentos;
    }
}