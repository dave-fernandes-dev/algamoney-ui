import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class LancamentoFiltro{
  descricao!: string;
  dataVencimentoInicio!: Date;
  dataVencimentoFim!: Date;
  pagina = 0;
  itensPorPagina = 5;

}


@Injectable({
  providedIn: 'root',
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';


  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  pesquisar(): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http
      .get(`${this.lancamentosUrl}?resumo`, { headers }) // ou  { headers: headers }
      .toPromise()
      .then((response: any) => response['content']);
  }


  pesquisarComFiltro(filtro: LancamentoFiltro): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    //muita atenção  neste "set"  pq    params.set('page', filtro.pagina) NÃO FUNCIONA!
    let params = new HttpParams()
                      .set('page', filtro.pagina)
                      .set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      //Precisamos atribuir o resultado do método "set" novamente à variável "params"
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

  return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
    .toPromise()
      .then((response: any) => {

        const lancamentos = response['content'];
        const total = response['totalElements'];

        return {lancamentos, total};
      });
  }


}
