import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.scss'],
})
export class PessoasPesquisaComponent {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas: any[] = [];

  constructor(private pessoaService: PessoaService) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisarComFiltro(this.filtro).then((resultado) => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    //console.log(event)
    this.filtro.itensPorPagina = event.rows!;
    const pagina = event.first! / event.rows!;
    this.pesquisar(pagina);
  }
}
