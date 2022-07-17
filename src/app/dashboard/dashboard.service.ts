import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
//import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  lancamentosUrl = environment.apiUrl+'/lancamentos';

  constructor(private http: HttpClient, private datePipe: DatePipe, @Inject(LOCALE_ID) private locale: string) {}

  lancamentosPorCategoria(): Promise<any[]> {

    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then((response:any) => response );
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then((response : any) => {
        //console.log(response);
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: any[]) {
    for (const dado of dados) {
      //console.log("dado antes:"+dado.dia + " - "+ typeof dado.dia)

      //Evita bug na hora da edição, adiciona o timezone do usuário
      let offset = new Date().getTimezoneOffset() * 60000;
      dado.dia = new Date(new Date(dado.dia).getTime() + offset);

      //console.log("dado depois:"+dado.dia + " - "+ typeof dado.dia)
    }
  }

}
