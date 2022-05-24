import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AtendimentoNovoComponent } from "./atendimento/adiciona/atendimento-adiciona.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes =[
    { path:'home', component:  HomeComponent },
    { path: 'atendimento/novo', component: AtendimentoNovoComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
    providers: [
    ]
})
export class FuncionarioRoutingModule {}