import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro{
  nome!: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root',
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';


  constructor(private http: HttpClient) {}

  pesquisar(): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http
      .get(`${this.pessoasUrl}?resumo`, { headers }) // ou  { headers: headers }
      .toPromise()
      .then((response: any) => response['content']);
  }


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

  return this.http.get(`${this.pessoasUrl}?resumo`, { headers, params })
    .toPromise()
      .then((response: any) => {

        const contents = response['content'];
        const total = response['totalElements'];

        return {contents, total};
      });
  }


}
