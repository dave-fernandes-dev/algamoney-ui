import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.scss'],
})
export class LancamentosCadastroComponent implements OnInit {

  categorias: any[] = [];
  pessoas: any[] = [];
  lancamento = new Lancamento();

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  constructor(private categoriaService: CategoriaService,
              private errorHandler: ErrorHandlerService,
              private pessoaService: PessoaService,
              private messageService: MessageService,
              private lancamentoService: LancamentoService,
              private route: ActivatedRoute
              ) {}


  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.loadCategorias();
    this.loadPessoas();
  }

  salvar(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.messageService.add({severity:'success', summary:'Registro salvo com Sucesso!', detail:'Registro salvo com Sucesso!'});
      lancamentoForm.reset();
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  loadCategorias() {
    return this.categoriaService.listarTodas()
      .then( itens => {
         this.categorias = itens.map((c: any) => ({ label: c.nome, value: c.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  loadPessoas() {
    return this.pessoaService.listarTodas2()
      .then( itens => {
         this.pessoas = itens.map((c: any) => ({ label: c.nome, value: c.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
