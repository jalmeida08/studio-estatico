import { NgModule } from '@angular/core';
import { AdministracaoRoutingModule } from './administracao-routing.module';
import { ProcedimentoModule } from './procedimento/procedimento.module';


@NgModule({
    imports: [
        AdministracaoRoutingModule,
        ProcedimentoModule
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class AdministracaoModule { }
