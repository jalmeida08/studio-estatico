import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListaProcedimentoComponent } from './lista-procedimentos.component';

@NgModule({
    imports: [CommonModule],
    exports: [ListaProcedimentoComponent],
    declarations: [ListaProcedimentoComponent],
    providers: [],
})
export class ListaProcedimentoModule { }
