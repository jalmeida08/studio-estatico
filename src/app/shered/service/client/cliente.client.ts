import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../../model/cliente';

@Injectable({providedIn: 'root'})
export class ClienteClient {

    constructor(
        private http: HttpClient
    ) { }
    
    novoCliente(cliente:Cliente):Observable<Cliente> {
        return this.http.post<Cliente>(
            `${environment.baseApi.CADASTRO_BASICO}/cliente`, cliente);
    }

    buscaCliente(cliente:Cliente):Observable<Cliente[]> {
        return this.http.post<Cliente[]>(`${environment.baseApi.CADASTRO_BASICO}/cliente/busca-cliente`, cliente);
    }
}