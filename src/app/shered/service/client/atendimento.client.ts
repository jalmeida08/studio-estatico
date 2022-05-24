import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtendimentoForm } from 'src/app/area-restrita/funcionario/atendimento/adiciona/atendimento-form';
import { environment } from 'src/environments/environment';
import { AgendaDiaFuncionario } from '../../model/agenda-dia-funcionario';
import { Atendimento } from '../../model/atendimento';
import { AtendimentoHome } from '../../model/atendimento-home';
import { AtendimentoDetalhe } from '../../model/atendimentoDetalhe';
import { EditaAtendimentoForm } from '../../model/edita-atendimento-form';
import { ValidaAtendimento } from '../../model/valida-atendimento';

@Injectable({providedIn: 'root'})
export class AtendimentoClient {

    constructor(private http: HttpClient) {}

    listaAtendimentoDia(atendimentoDia?:string): Observable<AtendimentoHome[]> {
        return this.http.post<AtendimentoHome[]>(`${environment.baseApi.STUDIO}/atendimento/lista-atendimento-dia`, {atendimentoDia});
    }

    validaAtendimento(atendimento:AtendimentoForm|EditaAtendimentoForm):Observable<ValidaAtendimento> {
        return this.http.post<ValidaAtendimento>(
            `${environment.baseApi.STUDIO}/atendimento/valida-atendimento`, atendimento);
    }
    
    buscaAgendaDiaFuncionario(agendaFunci: AgendaDiaFuncionario):Observable<Atendimento[]>{
        return this.http.post<Atendimento[]>(`${environment.baseApi.STUDIO}/atendimento/agenda-dia-funcionario`, agendaFunci);
    }

    salvarAtendimento(atendimento: AtendimentoForm):Observable<HttpResponseBase> {
        return this.http.post<HttpResponseBase>(`${environment.baseApi.STUDIO}/atendimento`,atendimento);
    }

    detalhaAtendimento(id:string):Observable<AtendimentoDetalhe> {
        return this.http.get<AtendimentoDetalhe>(`${environment.baseApi.STUDIO}/atendimento/${id}`);
    }

    finalizarAtendimento(id:string):Observable<HttpResponseBase> {
        return this.http.put<HttpResponseBase>(`${environment.baseApi.STUDIO}/atendimento/${id}/finaliza-atendimento`,{});
    }

    desmarcaAtendimento(id:string):Observable<HttpResponseBase> {
        return this.http.put<HttpResponseBase>(`${environment.baseApi.STUDIO}/atendimento/${id}/desmarca-atendimento`,{});
    }
    
    validaEdicaoAtendimento(atendimento:EditaAtendimentoForm):Observable<ValidaAtendimento>{
        return this.http.post<ValidaAtendimento>(`${environment.baseApi.STUDIO}/atendimento/valida-edicao-atendimento`, atendimento);
    }
    editaAtendimento(atendimento:EditaAtendimentoForm):Observable<ValidaAtendimento>{
        return this.http.put<ValidaAtendimento>(`${environment.baseApi.STUDIO}/atendimento/edita-atendimento`, atendimento);
    }
}