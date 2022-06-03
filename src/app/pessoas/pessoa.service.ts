import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro{
  nome?: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root',
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8090/pessoas';


  constructor(private http: HttpClient) {}

  pesquisarComFiltro(filtro: PessoaFiltro): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    //muita atenção  neste "set"  pq    params.set('page', filtro.pagina) NÃO FUNCIONA!
    let params = new HttpParams()
                      .set('page', filtro.pagina)
                      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      //Precisamos atribuir o resultado do método "set" novamente à variável "params"
      params = params.set('nome', filtro.nome);
    }

  return this.http.get(`${this.pessoasUrl}?paginado`, { headers, params })
    .toPromise()
      .then((response: any) => {

        const pessoas = response['content'];
        const total = response['totalElements'];

        return {pessoas, total};
      });
  }

  listarTodas() : Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then((response: any) => response['content']);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise();
  }


}
