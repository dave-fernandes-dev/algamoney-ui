import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos: any[] = [] ;
  // ou lancamentos = [] ;


  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit(): void {
    this.pesquisar();
   }

  pesquisar(): void {
    this.lancamentoService.pesquisar()
      .then(lancamentos => this.lancamentos = lancamentos);
  }

}
