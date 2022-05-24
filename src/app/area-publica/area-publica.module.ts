import { NgModule } from '@angular/core';
import { AreaPublicaRoutingModule } from './area-publica-routing.module';
import { LoginModule } from './login/login.module';

@NgModule({
    declarations: [],
    imports: [
        LoginModule,
        AreaPublicaRoutingModule,
    ],
    exports: [],
    providers: [],
})
export class AreaPublicaModule { }
