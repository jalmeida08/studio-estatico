import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProcedimentoComponent } from "./procedimento/procedimento.component";

const routes: Routes =[
    {path: 'procedimento', component: ProcedimentoComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
    providers: [
    ]
})
export class AdministracaoRoutingModule {}