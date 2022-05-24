import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Procedimento } from '../../model/procedimento';
import { ProcedimentoDetalhe } from '../../model/procedimento-detalhe';

@Injectable({providedIn: 'root'})
export class ProcedimentoClient {

    constructor(private http: HttpClient) {}

    listaProcedimentos():Observable<Procedimento[]> {
        return this.http.get<Procedimento[]>(`${environment.baseApi.STUDIO}/procedimento`);
    }

    detalhaProcedimento(id:string):Observable<ProcedimentoDetalhe> {
        return this.http.get<ProcedimentoDetalhe>(`${environment.baseApi.STUDIO}/procedimento/${id}`);
    }
    
}