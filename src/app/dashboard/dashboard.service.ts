import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  lancamentosUrl = environment.apiUrl+'/lancamentos';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  lancamentosPorCategoria(): Promise<any[]> {

    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria}`)
      .toPromise()
      .then((response:any) => response );
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then((response : any) => {
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: any[]) {
    for (const dado of dados) {
      this.datePipe.transform(dado.dia, 'yyyy-MM-dd')!
    }
  }

}
