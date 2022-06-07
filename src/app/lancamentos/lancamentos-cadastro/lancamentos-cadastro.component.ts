import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss'],
})
export class LancamentosCadastroComponent implements OnInit {

  categorias: any[] = [];

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  // categorias = [
  //   { label: 'Alimentação', value: '1' },
  //   { label: 'Transporte', value: '2' },
  // ];

  pessoas = [
    { label: 'João da Silva', value: '1' },
    { label: 'Sebastião Souza', value: '2' },
    { label: 'Maria Abadia', value: '3' },
  ];

  constructor(private categoriaService: CategoriaService, private errorHandler: ErrorHandlerService ) {}


  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias() {
    return this.categoriaService.listarTodas()
      .then( itens => {
         this.categorias = itens.map((c: any) => ({ label: c.nome, value: c.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
