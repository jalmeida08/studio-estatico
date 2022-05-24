import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';


@NgModule({
    declarations: [LoginComponent],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [],
})
export class LoginModule { }
