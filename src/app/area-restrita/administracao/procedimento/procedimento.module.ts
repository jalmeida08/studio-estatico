import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListaProcedimentoComponent } from './lista-procedimento/lista-procedimento.component';
import { ProcedimentoComponent } from './procedimento.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [],
    declarations: [
        ListaProcedimentoComponent,
        ProcedimentoComponent
    ],
    providers: [],
})
export class ProcedimentoModule { }
