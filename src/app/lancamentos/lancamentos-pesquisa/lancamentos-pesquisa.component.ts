import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss'],
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao!: string;
  dataVencimentoInicio!: Date;
  dataVencimentoFim!: Date;
  lancamentos: any[] = [];
  // ou lancamentos = [] ;

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(): void {

    const filtro: LancamentoFiltro = {
      descricao : this.descricao,
      dataVencimentoInicio : this.dataVencimentoInicio,
      dataVencimentoFim : this.dataVencimentoFim
    }

    this.lancamentoService.pesquisarComFiltro(filtro)
    .then(lancamentos => (this.lancamentos = lancamentos));
  }
}
