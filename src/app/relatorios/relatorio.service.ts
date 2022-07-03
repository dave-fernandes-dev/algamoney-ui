import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { DatePipe } from '@angular/common';

//import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl = environment.apiUrl+'/lancamentos';

  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new HttpParams()
      //.set('inicio', moment(inicio).format('YYYY-MM-DD'))
      .set('inicio', this.datePipe.transform(inicio, 'yyyy-MM-dd')!)

      //.set('fim', moment(fim).format('YYYY-MM-DD'));
      .set('fim', this.datePipe.transform(fim, 'yyyy-MM-dd')!);

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, { params, responseType: 'blob' })
      .toPromise();
  }

}
