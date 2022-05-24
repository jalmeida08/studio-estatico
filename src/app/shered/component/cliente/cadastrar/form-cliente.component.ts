import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/shered/model/cliente';

@Component({
    selector: 'form-cliente-app',
    templateUrl: './form-cliente.component.html'
})

export class FormClienteComponent implements OnInit, OnDestroy {

    private $destroy = new Subject<boolean>();
    @Input() nomeBotao = 'buscar';
    @Input() formCliente = new FormGroup({});
    @Output() enviaDadosFormularioEvent = new EventEmitter();
    
    constructor() {
    }
    
    ngOnInit() {
    }
    ngOnDestroy(): void {
        this.$destroy.next(true);
        this.$destroy.unsubscribe();
    }

    enviaDados() {
        const cliente = this.formCliente.value as Cliente;
        console.log(this.formCliente.value);
        
        this.enviaDadosFormularioEvent.emit(cliente);
    }


   
}