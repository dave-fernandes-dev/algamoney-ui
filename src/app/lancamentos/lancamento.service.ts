import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
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
  lancamentosUrl = 'http://localhost:8090/lancamentos';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  pesquisar(): Promise<any> {
    return this.http
      .get(`${this.lancamentosUrl}?resumo`) // ou  { headers: headers }
      .toPromise()
      .then((response: any) => response['content']);
  }

  pesquisarComFiltro(filtro: LancamentoFiltro): Promise<any> {

    //muita atenção  neste "set"  pq    params.set('page', filtro.pagina) NÃO FUNCIONA!
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      //Precisamos atribuir o resultado do método "set" novamente à variável "params"
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set(
        'dataVencimentoDe',
        this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!
      );
    }

    if (filtro.dataVencimentoFim) {
      params = params.set(
        'dataVencimentoAte',
        this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!
      );
    }

    return this.http
      .get(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response['content'];
        const total = response['totalElements'];

        return { lancamentos, total };
      });
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`)
      .toPromise();
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.id}`, lancamento)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then((response:any) => {
        this.converterStringsParaDatas([response]);

        return response;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      //Evita bug na hora da edição, adiciona o timezone do usuário
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }

}
