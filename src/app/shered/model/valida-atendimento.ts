import { Atendimento } from "./atendimento";

export class ValidaAtendimento {
    
    listaAtendimentoConflitante = new Array<Atendimento>();
	atendimentoSolicitado!:Atendimento;

    constructor() {}
}