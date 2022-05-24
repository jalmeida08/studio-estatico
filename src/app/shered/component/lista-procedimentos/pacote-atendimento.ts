import { Funcionario } from "../../model/funcionario";
import { Procedimento } from "../../model/procedimento";

export class PacoteAtendimento {

    procedimento = new Procedimento();
    funcionario = new Funcionario();

    constructor(procedimento:Procedimento, funcionario:Funcionario){
        this.funcionario = funcionario;
        this.procedimento = procedimento;
    }
}