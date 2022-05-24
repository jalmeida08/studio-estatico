export class Mensagem {

    constructor(
        public readonly tipoMensagem: TipoMensagem,
        public readonly mensagem: string
    ) {}

}

export enum TipoMensagem {
    SUCCESS,
    ERROR,
    WARNING,
    INFO
}