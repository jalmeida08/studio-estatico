import { NgModule } from '@angular/core';
import { AdministracaoModule } from './administracao/administracao.module';
import { AreaRestritaRoutingModule } from './area-restrita-routing.module';
import { FuncionarioModule } from './funcionario/funcionario.module';


@NgModule({
    imports: [
        FuncionarioModule,
        AreaRestritaRoutingModule,
        AdministracaoModule,
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class AreaRestritaModule { }
