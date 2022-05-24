import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BotaoDTO } from './botao-dto';

declare const $: any;
@Component({
    selector: 'modal-app',
    templateUrl: 'modal.component.html'
})

export class ModalComponent implements OnInit, OnDestroy {

    @Input() modalEvent = new Subject<'OPEN'|'CLOSE'>();
    @Input() tituloModal!: string;
    @Input() idModal = 'modal';
    @Input() listaBotao!: Array<BotaoDTO>;

    $destroy = new Subject<boolean>();

    constructor() { }

    ngOnInit() { 
        this.eventoModal();
    }

    ngOnDestroy(): void {
        this.$destroy.next(true);
        this.$destroy.unsubscribe();
    }

    tratarClick(item:BotaoDTO) {
        item
            .acaoEnvetSubject
            .next(true);
    }

    private eventoModal() {
        this.modalEvent
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (res:'OPEN'|'CLOSE') => {
                    if(res === 'OPEN')
                        $('#'+this.idModal).modal('show');
                    else if(res === 'CLOSE')
                        $('#'+this.idModal).modal('hide');

                }
            })
    }

}