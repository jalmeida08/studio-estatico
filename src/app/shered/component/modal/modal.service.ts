import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ModalService implements OnDestroy {
    private $destroy = new Subject<boolean>();

    constructor() { }

    ngOnDestroy(): void {
        this.$destroy.next(true);
        this.$destroy.unsubscribe();
    }

    acaoBotao(botaEvent:Subject<any>, funcaoCallBack:any) {
        botaEvent
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next:(res) => {
                    console.log(res);
                    if(res)
                        funcaoCallBack();
                }
            });
    }

    
}