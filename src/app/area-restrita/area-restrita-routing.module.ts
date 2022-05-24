import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuncionarioModule } from "./funcionario/funcionario.module";


const routes: Routes =[
  { path: 'funcionario', loadChildren: () => FuncionarioModule }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaRestritaRoutingModule {}