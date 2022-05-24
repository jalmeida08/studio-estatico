import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalendarioComponent } from './calendario.component';

@NgModule({
    imports: [ CommonModule ],
    exports: [ CalendarioComponent ],
    declarations: [ CalendarioComponent ],
    providers: [DatePipe],
})
export class CalendarioModule { }
