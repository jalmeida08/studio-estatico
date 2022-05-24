import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaPublicaModule } from './area-publica/area-publica.module';
import { AreaRestritaModule } from './area-restrita/area-restrita.module';
import { AreaRestritaGuard } from './core/guard/area-restrita.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => AreaPublicaModule },
  { path: 'studio', loadChildren: () => AreaRestritaModule, canActivate: [ AreaRestritaGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
