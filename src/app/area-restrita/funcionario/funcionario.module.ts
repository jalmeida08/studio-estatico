import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormClienteModule } from 'src/app/shered/component/cliente/cadastrar/form-cliente.module';
import { ListaProcedimentoModule } from 'src/app/shered/component/lista-procedimentos/lista-procedimentos.module';
import { ModalModule } from 'src/app/shered/component/modal/modal.module';
import { AtendimentoNovoComponent } from './atendimento/adiciona/atendimento-adiciona.component';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { HomeModule } from './home/home.module';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

@NgModule({
    declarations: [AtendimentoNovoComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FuncionarioRoutingModule,
        HomeModule,
        ListaProcedimentoModule,
        FormClienteModule,
        ModalModule,
    ],
    exports: [],
    providers: [
        DatePipe,
        {
            provide: LOCALE_ID,
            useValue: 'pt'
        }
    ],
})
export class FuncionarioModule { }
