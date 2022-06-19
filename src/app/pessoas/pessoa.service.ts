import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../core/model';

export class PessoaFiltro{
  nome?: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root',
})
export class PessoaService {

  pessoasUrl = environment.apiUrl+'/pessoas';
  errorHandler: any;


  constructor(private http: HttpClient) {}

  pesquisarComFiltro(filtro: PessoaFiltro): Promise<any> {

    //muita atenção  neste "set"  pq    params.set('page', filtro.pagina) NÃO FUNCIONA!
    let params = new HttpParams()
                      .set('page', filtro.pagina)
                      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      //Precisamos atribuir o resultado do método "set" novamente à variável "params"
      params = params.set('nome', filtro.nome);
    }

  return this.http.get(`${this.pessoasUrl}?paginado`, { params })
    .toPromise()
      .then((response: any) => {

        const pessoas = response['content'];
        const total = response['totalElements'];

        return {pessoas, total};
      });
  }

  listarTodas() : Promise<any> {
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then((response: any) => response['content']);
  }

  listarTodas2(): Promise<any> {
    return this.http.get(this.pessoasUrl)
      .toPromise();
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
  }


  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise();
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then((response:any) => {
        return response;
       });
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}`, pessoa)
      .toPromise();
  }

}
