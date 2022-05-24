import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Procedimento } from 'src/app/shered/model/procedimento';

@Component({
    templateUrl: 'procedimento.component.html'
})

export class ProcedimentoComponent implements OnInit {

    initProcedimentoSubject = new Subject<boolean>();
    isShowProcedimento = false;

    constructor() {
    }

    ngOnInit() {
        this.initProcedimentoSubject.next(true);
        this.isShowProcedimento = true;
    }

    recebeProcedimento(p:Procedimento ){
        console.log(p);
    }

}