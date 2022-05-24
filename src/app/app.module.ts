import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestInterceptor } from './core/interceptor/auth.interceptor';
import { CalendarioModule } from './shered/component/calendario/calendario.module';
import { MensagemComponent } from './shered/component/mensagem/mensagem.component';
import ptBr from '@angular/common/locales/pt';
import { NgxMaskModule } from 'ngx-mask';
registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    MensagemComponent
  ],
  imports: [
    NgxMaskModule.forRoot(),
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    CalendarioModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
  },
    DatePipe,
    {
        provide: LOCALE_ID,
        useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
