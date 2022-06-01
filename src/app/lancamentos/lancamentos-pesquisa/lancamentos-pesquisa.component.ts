import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss'],
})
export class LancamentosPesquisaComponent  {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: any[] = [];
  @ViewChild('tabela') grid!: Table;

  constructor(private lancamentoService: LancamentoService) {}

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisarComFiltro(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    //console.log(event)
    this.filtro.itensPorPagina = event.rows!;
    const pagina = event.first!/event.rows!;
    this.pesquisar(pagina);
  }


  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .then(() => {
        this.grid.reset();
      });
  }
}
