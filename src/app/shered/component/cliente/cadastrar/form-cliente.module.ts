import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormClienteComponent } from './form-cliente.component';


@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [FormClienteComponent],
    declarations: [FormClienteComponent],
    providers: [],
})
export class FormClienteModule { }
