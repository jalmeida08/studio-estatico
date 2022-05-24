import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../../model/funcionario';

@Injectable({providedIn: 'root'})
export class DadosFuncionarioClient {

    constructor(private http:HttpClient) { }

    consultaListaFuncionario(listaFuncionario:Array<string>):Observable<Funcionario[]>{
        return this.http.post<Funcionario[]>(
            `${environment.baseApi.CADASTRO_BASICO}/funcionario/consulta-lista`,
            listaFuncionario
        );
    }
    
}