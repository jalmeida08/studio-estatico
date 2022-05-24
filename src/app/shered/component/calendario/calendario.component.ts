import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'calendario-app',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit {
    constructor() { }
    ngOnInit(): void {
        this.MontarDiasMes(0, undefined);
        this.escolherNomeMes();
        this.verificarQualDiaSemanaDeveIniciarCalendario();
    }

    public arrayDiasMes: Array<Date> = new Array<Date>();
    public arrayDiasSemana: Array<string> = new Array<string>('Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb');
    private arrayNomeMes: Array<string> = new Array(
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    );
    nomeMes: string = '';
    ano = new Date().getFullYear();
    dateCalendario = new Date();
    diaInitCalendar: string = '';
    diaSelecionado: number = 0;
    classDiaSelecionado: object = { 'outline': 'none', 'background-color': '#3ebd93', 'color': '#FFF' };
    classDiaAatual: object = { 'outline': 'none', 'background-color': '#147d64', 'color': '#FFF' };
    diaAtual: number = new Date().getDate();
    @Output() diaSelecionadoEvent = new EventEmitter();

    private MontarDiasMes(mes: number, isAvancarMes: boolean | undefined) {
        this.arrayDiasMes = new Array<Date>();
        let ultimoDia = 0;
        if (isAvancarMes === true)
            this.dateCalendario = new Date(this.dateCalendario.getFullYear(), this.dateCalendario.getMonth() + 1, this.dateCalendario.getDate());
        else if (isAvancarMes === false)
            this.dateCalendario = new Date(this.dateCalendario.getFullYear(), this.dateCalendario.getMonth() - 1, this.dateCalendario.getDate());
        else
            this.dateCalendario = new Date(this.dateCalendario.getFullYear(), this.dateCalendario.getMonth(), this.dateCalendario.getDate());

        ultimoDia = new Date(this.dateCalendario.getFullYear(), this.dateCalendario.getMonth() + 1, 0).getDate();
        this.ano = this.dateCalendario.getFullYear();

        for (let i = 1; i <= ultimoDia; i++) {
            this.arrayDiasMes.push(new Date(this.dateCalendario.getFullYear(), this.dateCalendario.getMonth(), i));
        }
    }

    public verificarEstilo(dia: Date):any {
        if (dia.getDate() === this.diaSelecionado)
            return this.classDiaSelecionado;
        else if (dia.getDate() === new Date().getDate() && dia.getMonth() === new Date().getMonth() && dia.getFullYear() === new Date().getFullYear())
            return this.classDiaAatual;
        else return '';
    }

    public escolherNomeMes() {
        this.nomeMes = this.arrayNomeMes[this.dateCalendario.getMonth()];
    }

    public selecionarDia(diaSelecionado: Date) {
        if (this.diaSelecionado !== diaSelecionado.getDate()) {
            this.diaSelecionado = diaSelecionado.getDate();
            this.emitirDataSelecionada(diaSelecionado);
        }
    }

    public emitirDataSelecionada(diaSelecionado: Date) {
        this.diaSelecionadoEvent.emit(diaSelecionado);
    }

    public avancarMes() {
        let mesCalendario: number = (this.dateCalendario.getMonth() + 1);
        this.MontarDiasMes(mesCalendario + 1, true);
        this.escolherNomeMes();
        this.verificarQualDiaSemanaDeveIniciarCalendario();
    }

    public voltarMes() {
        let mesCalendario: number = (this.dateCalendario.getMonth() + 1);
        this.MontarDiasMes(mesCalendario - 1, false);
        this.escolherNomeMes();
        this.verificarQualDiaSemanaDeveIniciarCalendario();
    }

    private verificarQualDiaSemanaDeveIniciarCalendario() {
        let diaSemana = new Date(this.dateCalendario.getFullYear(), this.dateCalendario.getMonth(), 1).getDay();

        switch (diaSemana) {
            case 0:
                this.diaInitCalendar = 'init-calendar-dom';
                break;
            case 1:
                this.diaInitCalendar = 'init-calendar-seg';
                break;
            case 2:
                this.diaInitCalendar = 'init-calendar-ter';
                break;
            case 3:
                this.diaInitCalendar = 'init-calendar-qua';
                break;
            case 4:
                this.diaInitCalendar = 'init-calendar-qui';
                break;
            case 5:
                this.diaInitCalendar = 'init-calendar-sex';
                break;
            case 6:
                this.diaInitCalendar = 'init-calendar-sab';
                break;
            default:
                break;
        }
    }


}